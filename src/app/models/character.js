"use strict";
module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define(
    "Character",
    {
      name: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {
      tableName: "Characters"
    }
  );

  Character.associate = function(models) {
    Character.belongsToMany(models.Comic, {
      through: models.CharacterComics
    });
  };
  return Character;
};
