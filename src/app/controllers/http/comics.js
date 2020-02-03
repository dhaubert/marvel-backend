const { Character, Comic } = require("../../models");

class CharacterController {
  constructor() {
    this.model = Comic;
  }
  async index(request, response) {
    try {
      const result = await Comic.findAll({
        attributes: [
          "id",
          "title",
          "description",
          "variant_description",
          "page_count",
          "thumbnail"
        ],
        include: {
          model: Character,
          through: { attributes: [] }
        }
      });
      return response.json(result);
    } catch (error) {
      response.status(400).json({ error: true, errorMessage: error.message });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const result = await Comic.findByPk(id);
      if (!result) {
          throw { errorCode: 404, message: `Comic ${id} not found`, error: true};
      }
      response.json(result);
    } catch (error) {
      return response
        .status(error.errorCode)
        .json({ error: true, errorCode: error.errorCode, errorMessage: error.message });
    }
  }
}

const character = new CharacterController();
module.exports = character;
