const logger = require("../Config/logger")(module);
const { roles } = require("../Config/config");
const db = require("../Config/database");
const { passwordHash } = require("../middleware/password-hash");
const saveClient = async (req, res) => {
    logger.info("REST request to save Client details");
    var adminDetails = req.body;
    var hashPassword = await passwordHash.generateHashPwd(adminDetails.password);
    try {
        await db.query("BEGIN");
        var userInsert = 'INSERT INTO user_tbl(user_name,password,role) VALUES($1,$2,$3)';
        await db.query(userInsert, [adminDetails.userName,
            hashPassword, roles.CLIENT]);
        var clientInsert = 'INSERT INTO client_tbl(user_name,name) VALUES($1,$2)';
        await db.query(clientInsert, [adminDetails.userName,
        adminDetails.name])
        await db.query("COMMIT");

        res.status(200).json({
            message: "Client Registered successfully"
        });
    } catch (error) {
        logger.error(JSON.stringify(error));
        await db.query("ROLLBACK");
        res.status(500).json({
            message: error
        });
    }
}

const saveCustomer = async (req, res) => {
    logger.info("REST request to save Customer details");
    var adminDetails = req.body;
    var hashPassword = await passwordHash.generateHashPwd(adminDetails.password);
    try {
        await db.query("BEGIN");
        var userInsert = 'INSERT INTO user_tbl(user_name,password,role) VALUES($1,$2,$3)';
        await db.query(userInsert, [adminDetails.userName,
            hashPassword, roles.CUSTOMER]);
        var customerInsert = 'INSERT INTO cust_tbl(name,address,client_id) VALUES($1,$2,$3)';
        await db.query(customerInsert, [adminDetails.name,
        adminDetails.address, adminDetails.clientId])
        await db.query("COMMIT");

        res.status(200).json({
            message: "Customer Registered successfully"
        });
    } catch (error) {
        logger.error(JSON.stringify(error));
        await db.query("ROLLBACK");
        res.status(500).json({
            message: error
        });
    }
}

const saveAdmin = async (req, res) => {
    logger.info("REST request to save admin details");
    var adminDetails = req.body;
    var hashPassword = await passwordHash.generateHashPwd(adminDetails.password);
    try {
        await db.query("BEGIN");
        var userInsert = 'INSERT INTO user_tbl(user_name,password,role) VALUES($1,$2,$3)';
        await db.query(userInsert, [adminDetails.userName,
            hashPassword, roles.ADMIN]);
        var clientInsert = 'INSERT INTO client_tbl(user_name,name) VALUES($1,$2)';
        await db.query(clientInsert, [adminDetails.userName,
        adminDetails.name])
        await db.query("COMMIT");

        res.status(200).json({
            message: "Admin Registered successfully"
        });
    } catch (error) {
        logger.error(JSON.stringify(error));
        await db.query("ROLLBACK");
        res.status(500).json({
            message: error
        });
    }
}

module.exports = {
    saveClient,
    saveCustomer,
    saveAdmin
}