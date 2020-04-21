const { Pool } = require("pg");
const { db_config } = require("./config");
const logger = require("./logger")(module);

const pool = new Pool(
    db_config
);
pool.connect((err, res) => {
    if (err) {
        logger.error(`Error in connecting Db :${err}`);
    } else {
        logger.info(`Successfully connected to postgre :${db_config.host}`)
    }
});

pool.on("error", (err) => {
    logger.error(`Error occured in DB ${err}`)
})


const query = (query, param) => {
    logger.info(`TO execute ${query}`)
    return new Promise((resolve, reject) => {
        pool.query(query, param).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports.query = query;