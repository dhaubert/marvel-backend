const { Character, Comic } = require("../../models");

class CharacterController {
  constructor() {
    this.model = Character;
  }
  async index(request, response) {
    try {
      const result = await Character.findAll({
        attributes: ['id', 'name', 'description', 'thumbnail'],
        include: {
          model: Comic,
          through: {attributes: []}
        }
      });
      response.json(result);
    } catch (error) {
      response.status(400).json({ error: true, errorMessage: error.message });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const result = await Character.findByPk(id);
      if (!result) {
          throw { errorCode: 404, message: `Character ${id} not found`, error: true};
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
