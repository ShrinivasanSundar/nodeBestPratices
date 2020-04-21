const logger = require("../Config/logger")(module);

const authenticate = (req, res) => {
    logger.info("to autheticate");
}

module.exports = {
    authenticate
}