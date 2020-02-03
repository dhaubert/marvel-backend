"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("CharacterComics", {
      character_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Characters",
          key: "id",
          as: "character_id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      comic_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Comics",
          key: "id",
          as: "comic_id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("CharacterComics");
  }
};
