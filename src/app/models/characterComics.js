"use strict";
module.exports = (sequelize, DataTypes) => {
  const CharacterComics = sequelize.define(
    "CharacterComics",
    {
      character_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Character",
          key: "id",
          as: "character_id"
        }
      },
      comic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Comic",
          key: "id",
          as: "comic_id"
        }
      }
    },
    {
      tableName: "CharacterComics",
      underscored: true,
      underscoredAll: true,
      timestamps: false
    }
  );
  return CharacterComics;
};
