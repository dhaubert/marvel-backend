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
      tableName: "Characters",
      underscored: true,
      underscoredAll: true
    }
  );

  Character.associate = function(models) {
    Character.belongsToMany(models.Comic, {
      through: models.CharacterComics,
      foreignKey: 'character_id'
    });
  };
  return Character;
};
