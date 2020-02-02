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
      tableName: "Characters"
    }
  );
  Comic.associate = function(models) {
    Comic.belongsToMany(models.Character, {
      through: models.CharacterComics
      // as: "characters",
      // foreignKey: "comic_id"
    });
  };
  return Comic;
};
