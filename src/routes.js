const characters = require("./app/routes/characters");
const comics = require("./app/routes/comics");
const index = require("./app/routes/index");

module.exports = [
  { route: "/", routerController: index },
  { route: "/characters", routerController: characters },
  { route: "/comics", routerController: comics }
];
