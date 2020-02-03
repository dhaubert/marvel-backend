const marvelApi = require("marvel-api");
const log = require("../services/logging");
const environment = require("../services/environment");

const { Character: CharacterModel, Comic: ComicModel } = require("../models");

class MarvelSeed {
  constructor() {
    this.downloadInterval = 20;
    if (!environment.loadEnv({ checkVariable: "MARVEL_API_PUBLIC_KEY" })) {
      return;
    }
    log(`Running on ${process.env.NODE_ENV} environment:`);
    this.marvel = marvelApi.createClient({
      publicKey: process.env.MARVEL_API_PUBLIC_KEY,
      privateKey: process.env.MARVEL_API_PRIVATE_KEY
    });
  }

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

  characterFormat(requestObject) {
    return {
      id: requestObject.id,
      name: requestObject.name,
      description: requestObject.description,
      thumbnail:
        requestObject.thumbnail.path + "." + requestObject.thumbnail.extension
    };
  }

  loadEnv() {
    require("dotenv").config();
    if (!process.env.MARVEL_API_PUBLIC_KEY) {
      log("Please, check app environment variables (.env)");
      return;
    }
    log(`Running on ${process.env.NODE_ENV} environment:`);
    return true;
  }

  async run() {
    try {
      this.fetchCharacters();
    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  async fetchCharacters() {
    return this.fetchResource(this.marvel.characters);
  }

  async fetchComicsFromCharacter({ id }) {
    return await this.marvel.characters.comics(id);
  }

  async storeCharacters(characterData) {
    let result = [];

    try {
      for (let i = 0; i < characterData.length; i++) {
        let eachCharacter = characterData[i];
        log(
          "saving:" +
            eachCharacter.name +
            " comics: " +
            eachCharacter.Comics.length
        );
        console.log(eachCharacter.Comics);
        result.push(
          await CharacterModel.create(eachCharacter, {
            include: [ComicModel],
            ignoreDuplicates: true
          })
        );
        console.log("result:", result);
      }
    } catch (error) {
      if (error.name !== "SequelizeUniqueConstraintError") {
        console.log("Creation error:", error, characterData);
      }
    }
    return result;
  }

  async fetchResource(marvelResource) {
    try {
      let page = 0;
      let fromIndex = 0;
      let resourceLength = 0;
      const pageLength = this.downloadInterval;
      do {
        fromIndex = page * this.downloadInterval;
        const { data, meta } = await marvelResource.findAll(
          pageLength,
          fromIndex
        );
        resourceLength = meta.total;
        const percentage = Math.floor((meta.offset * 100) / meta.total);
        log(`${percentage}% - ${meta.offset}/${meta.total} remaining.`);

        // const characterComicsDataPromises = data.map(async characterObject => {
        //   const {
        //     data: comicsData,
        //     meta
        //   } = await this.fetchComicsFromCharacter(characterObject);
        //   const characterComicsPromises = comicsData.map(async comicData => {
        //     return this.comicFormat(comicData);
        //   });

        //   const characterComics = await Promise.all(characterComicsPromises);
        //   return {
        //     ...this.characterFormat(characterObject),
        //     Comics: characterComics
        //   };
        // });
        let charactersFormattedData = [];
        for (let i = 0; i < data.length; i++) {
          let characterObject = data[i];

          const { data: comicsData } = await this.fetchComicsFromCharacter(
            characterObject
          );
          // for (let j = 0; j < comicsData.length; j++) {
          //   const comicData = comicsData[j];

          // }
          // const comicsDataFormatted =
          charactersFormattedData.push({
            ...this.characterFormat(characterObject),
            Comics: comicsData.map(this.comicFormat),
            CharacterComics: comicsData.map(comic => {
              return {
                character_id: characterObject.id,
                comic_id: comic.id
              };
            })
          });
        }

        // const characterComicsData = await Promise.all(
        //   characterComicsDataPromises
        // );
        this.storeCharacters(charactersFormattedData);
        //   data.map(({ name, description, thumbnail, id, comics }) => {
        //     // console.log("CharacterModel:", name, description, thumbnail, id);
        //     // console.log("CharacterModel:", comics.collectionURI);
        //   });
        page++;
      } while (fromIndex < resourceLength);
    } catch (error) {
      console.log("ERROR:", error);
    }
  }
}

const script = new MarvelSeed();
script.run();
