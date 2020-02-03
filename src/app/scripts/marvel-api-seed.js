const marvelApi = require("marvel-api");
const log = require("../services/logging");
const environment = require("../services/environment");

const { Character: CharacterModel, Comic: ComicModel } = require("../models");

class MarvelSeed {
  constructor() {
    this.downloadInterval = 30;
    if (!environment.loadEnv({ checkVariable: "MARVEL_API_PUBLIC_KEY" })) {
      return;
    }
    log(`Running on ${process.env.NODE_ENV} environment.`);
    this.marvel = marvelApi.createClient({
      publicKey: process.env.MARVEL_API_PUBLIC_KEY,
      privateKey: process.env.MARVEL_API_PRIVATE_KEY
    });
  }

  /**
   * Main method, runs the script.
   */
  async run() {
    try {
      this.downloadCharacters(this.marvel.characters);
    } catch (error) {
      log("ERROR:", error);
    }
  }

  /**
   * Store the information about characters and its comics
   * @param {Array} characterData Array with characters information
   */
  async storeCharacters(characterData) {
    for (let i = 0; i < characterData.length; i++) {
      let eachCharacter = characterData[i];
      log(`Saving character: ${eachCharacter.name}. He is part of ${eachCharacter.Comics.length} comics.`);
      this.storeCharacter(eachCharacter);
    }
  }
  /**
   * Store information of a single character and several associations with Comics
   * @param {Object} eachCharacter Each character information (name, description, thumbnail, id)
   */
  async storeCharacter(eachCharacter) {
    
    try {
      return await CharacterModel.create(eachCharacter, {
        include: [ComicModel],
        ignoreDuplicates: true
      });
    } catch (error) {
      if (error.name !== "SequelizeUniqueConstraintError") {
        log("Creation error:", error);
      }
    }
  }
  /**
   * Consumes data from Marvel's API and stores in a local database
   * @param {Object} marvelResource Object resouce of marvel's API. i.e. this.marvel.characters
   */
  async downloadCharacters(marvelResource) {
    try {
      let page = 0;
      let fromIndex = 0;
      let resourceLength = 0;
      const pageLength = this.downloadInterval;

      do {
        fromIndex = page * this.downloadInterval;
        const { data: characterData, meta } = await marvelResource.findAll(
          pageLength,
          fromIndex
        );

        this.logProgress(meta);

        const charactersFormattedData = await this.fetchComicsAndFormat(
          characterData
        );

        this.storeCharacters(charactersFormattedData);

        resourceLength = meta.total;
        page++;
      } while (fromIndex < resourceLength);
    } catch (error) {
      log("ERROR:", error);
    }
  }
  /**
   * Fetches the comics that a given character was mentioned at
   * @param {Object} { id } Identifier of the character
   */
  async fetchComicsFromCharacter({ id }) {
    return await this.marvel.characters.comics(id);
  }
  /**
   * Fetches comic data and format the character with it.
   * @param {Array} characterData Data from marvel.characters.findAll
   */
  async fetchComicsAndFormat(characterData) {
    let charactersFormattedData = [];
    for (let i = 0; i < characterData.length; i++) {
      let characterObject = characterData[i];

      const { data: comicsData } = await this.fetchComicsFromCharacter(
        characterObject
      );

      const association = this.associationFormat(characterObject, comicsData);
      charactersFormattedData.push(association);
    }
    return charactersFormattedData;
  }

  /**
   * Logs the percentage and how much of total was already processed
   * @param {Object} {offset, total}
   */
  async logProgress({ offset, total }) {
    const percentage = Math.floor((offset * 100) / total);
    log(`${percentage}% - ${offset}/${total} remaining.`);
    return percentage;
  }

  /**
   * Formats for database creation
   * @param {Object} characterObject  Character information (1)
   * @param {Array} comicsData Comic's data array (1+)
   */
  associationFormat(characterObject, comicsData) {
    return {
      ...this.characterFormat(characterObject),
      Comics: comicsData.map(this.comicFormat)
    };
  }

  /**
   * Formats the object to be according the model
   * @param {Object} requestObject Object that comes from the Marvel API request
   * @returns {Object} Formatted object
   */
  comicFormat(requestObject) {
    return {
      id: requestObject.id,
      title: requestObject.title,
      variant_description: requestObject.variantDescription,
      description: requestObject.description,
      page_count: requestObject.pageCount,
      thumbnail:
        requestObject.thumbnail.path + "." + requestObject.thumbnail.extension
    };
  }
  /**
   * Formats the object to be according the model
   * @param {Object} requestObject Object that comes from the Marvel API request
   * @returns {Object} Formatted object
   */
  characterFormat(requestObject) {
    return {
      id: requestObject.id,
      name: requestObject.name,
      description: requestObject.description,
      thumbnail:
        requestObject.thumbnail.path + "." + requestObject.thumbnail.extension
    };
  }
}

const script = new MarvelSeed();
script.run();
