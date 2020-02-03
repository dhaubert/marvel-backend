const { Sequelize } = require("sequelize");
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

  show({ req, res }) {}
}

const character = new CharacterController();
module.exports = character;
