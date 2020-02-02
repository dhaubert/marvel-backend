if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
  if (!process.env.NODE_ENV) {
    throw "Please, initialize your environment (.env).";
  }
}

const app = require("./app");
const port = process.env.PORT || 8600;

console.log(`Server running on port ${port}`);
app.listen(port);
