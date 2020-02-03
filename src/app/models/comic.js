"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comic = sequelize.define(
    "Comic",
    {
      title: DataTypes.STRING,
      variant_description: DataTypes.TEXT,
      description: DataTypes.TEXT,
      thumbnail: DataTypes.STRING,
      page_count: DataTypes.INTEGER
    },
    {
      tableName: "Comics",
      underscored: true,
      underscoredAll: true
    }
  );
  Comic.associate = function(models) {
    Comic.belongsToMany(models.Character, {
      through: models.CharacterComics
    });
  };
  return Comic;
};
