module.exports = {
  development: {
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || null,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST || '127.0.0.1',
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
