
var jwt = require("jsonwebtoken");

module.exports = (app, passport) => {





    app.get("/auth/login", passport.authenticate('local', { session: false }), (req, res) => {
        res.status(req.user.status).send(req.user);
    });

}