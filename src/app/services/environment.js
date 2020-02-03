const log = require("./logging");

const loadEnv = ({ checkVariable }) => {
  require("dotenv").config();
  return checkEnv({ checkVariable });
};

const checkEnv = ({ checkVariable }) => {
  if (!process.env[checkVariable]) {
    log("Please, check app environment variables (.env)");
    return false;
  }
  return true;
};

module.exports = {
  loadEnv,
  checkEnv
};
