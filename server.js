const express = require('express');
const { port } = require('./Config/config');
const app = express();
const router = require("./Router");
const logger = require("./Config/logger")(module);
const bodyparser = require("body-parser");


var initalLogging = (req, res, next) => {
    logger.info(`[${req.method}]: ${req.originalUrl}`);
    next();
}



app.use(initalLogging);

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: true }));

router(app);

app.listen(port, () => {
    console.log("Server is up and listening in the port ", port)
})
