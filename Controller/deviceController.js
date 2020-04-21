const logger = require("../Config/logger")(module);
const db = require("../Config/database");
const getAllDevice = (req, res) => {
    logger.debug("Rest request to retrieve all Details");
    db.query("SELECT * FROM dev_tbl", null).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

module.exports = {
    getAllDevice
}