const express = require("express");

class App {
  constructor() {
    this.server = express();
    this.isDev = process.env.NODE_ENV != "production";

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
  }

  routes() {
    const routes = require("./routes");
    routes.map(route => this.server.use(route.route, route.routerController));
  }
}

module.exports = new App().server;
