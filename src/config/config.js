module.exports = {
  development: {
    username: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    },
  },
  test: {
    username: "root",
    password: null,
    database: "marvel",
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
    database: "marvel",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  }
};
