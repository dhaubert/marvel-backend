module.exports = {
  development: {
    username: "root",
    password: "",
    database: "marvel",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    },
    logging: console.log
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  }
};
