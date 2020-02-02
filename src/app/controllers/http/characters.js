const { Sequelize } = require("sequelize");
const { Character } = require("../../models");

class CharacterController {
  constructor() {
      
      this.model = Character;
  }
  async index({ req, res }) {
      const result = await Character.findAll();
      res.send(JSON.stringify(result, null, 2));
  }

  show({ id }) {
  }
}


const character = new CharacterController()
module.exports = character;
