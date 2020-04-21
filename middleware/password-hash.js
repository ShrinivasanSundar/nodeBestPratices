const bcrypt = require("bcrypt");

const saltRounds = 10;

const generateHashPwd = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            console.log("Hashed ", hash)
            return resolve(hash)
        });
    });
};

const validatePassword = (enteredPwd, hashedPwd) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(enteredPwd, hashedPwd, function (err, res) {
            console.log(err, res);
            if (err) {
                resolve(false);
            } else {
                resolve(res);
            }
        })
    });
};

module.exports.passwordHash = {
    generateHashPwd,
    validatePassword
}
