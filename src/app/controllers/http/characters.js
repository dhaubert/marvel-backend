const { Character, Comic } = require("../../models");
const Sequelize = require('sequelize');

class CharacterController {
  constructor() {
    this.model = Character;
  }
  async index(request, response) {
    try {
      const { offset, limit } = request.params;
      const { search } = request.query;

      const result = await Character.findAll({
        attributes: ["id", "name", "description", "thumbnail"],
        where: {
          name: {
            [Sequelize.Op.like]: '%'+ search +'%'
          }
        },
        offset,
        limit,
        subQuery: false,
        order: ["name"]
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
        throw {
          errorCode: 404,
          message: `Character ${id} not found`,
          error: true
        };
      }
      response.json(result);
    } catch (error) {
      return response.status(error.errorCode).json({
        error: true,
        errorCode: error.errorCode,
        errorMessage: error.message
      });
    }
  }

  async comics(request, response) {
    try {
      const { id } = request.params;
      const result = await Character.findByPk(id, {
        include: {
          model: Comic,
          through: { attributes: [] }
        }
      });
      const noComicsFound =
        !result || !result.Comics || result.Comics.length === 0;
      if (noComicsFound) {
        throw {
          errorCode: 404,
          message: `No comics found for ${id}`,
          error: true
        };
      }
      response.json(result.Comics);
    } catch (error) {
      return response.status(error.errorCode || 400).json({
        error: true,
        errorCode: error.errorCode,
        errorMessage: error.message
      });
    }
  }
}

const character = new CharacterController();
module.exports = character;
