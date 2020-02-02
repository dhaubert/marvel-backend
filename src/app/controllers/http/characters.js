const { Sequelize } = require("sequelize");
const { Character } = require("../../models");

class CharacterController {
  constructor() {
      
      this.model = Character;
  }
  index() {
      return Character.findAll();

  }

  show({ id }) {
  }
}


const character = new CharacterController()
module.exports = character;
