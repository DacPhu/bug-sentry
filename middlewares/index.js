const authMiddleware = require("./auth");
const logMiddleware = require("./log");
const socketMiddleware = require("./socket")
module.exports = {
  errorHandler: require("./errors"),
  authMiddleware,
  logMiddleware,
  socketMiddleware,
};
