const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const logger = require("../Config/logger")(module);
const { passwordHash } = require("./password-hash");
const db = require("../Config/database");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../Config/config");

passport.use(new LocalStrategy(function (username, password, done) {
    const select = 'Select * from user_tbl where user_name = $1';
    var result = {}
    db.query(select, [username]).then(async res => {
        try {
            if (res.rows.length > 0) {
                var userDetails = res.rows[0];
                var userPassword = userDetails.password.trim();
                var isValid = await passwordHash.validatePassword(password, userPassword);
                if (isValid) {
                    logger.info("generating JWT Token ");
                    var issuedDate = Date.now();
                    var expiryDate = new Date(issuedDate);
                    expiryDate.setDate(issuedDate.getDate + 60);
                    var bearerToken = jwt.sign({
                        userId: userDetails.user_id,
                        userName: userDetails.user_name,
                        role: userDetails.role,
                        exp: Math.floor(expiryDate / 1000) + 24 * (60 * 60)
                    }, jwt_secret);
                    result.status = 200;
                    result.bearerToken = bearerToken;
                    done(null, result);
                } else {
                    logger.info("Invalid password");
                    result.status = 401;
                    result.message = "Invalid password";
                    done(null, result);
                }
            } else {
                logger.info("invalid username");
                result.status = 401;
                result.message = "invalid username";
                done(null, result);
            }
        } catch (err) {
            result.status = 500;
            result.message = err;
            done(null, result);
        }
    }).catch(err => {
        result.status = 500;
        result.message = err;
        done(null, result);
    })
}));