const authenticate = require("./authRoutes");
const user = require("./userRoutes");
const device = require("./deviceRoutes");
const express = require("express");
const routes = express.Router();
const passport = require("passport");

module.exports = function (app) {

    app.use(passport.initialize());

    app.use("/api", routes);

    authenticate(routes, passport);

    user(routes);

    device(routes);
}