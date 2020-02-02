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
    {}
  );
  Comic.associate = function(models) {
    Comic.belogsToMany(models.Character, {
      through: models.CharacterComics,
      // as: "characters",
      // foreignKey: "comic_id"
    });
  };
  return Comic;
};
