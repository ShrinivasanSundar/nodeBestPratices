const { userController } = require("../Controller/index")

module.exports = (app) => {

    app.route("/user/clients")
        .post(userController.saveClient);





    app.route("/user/customers")
        .post(userController.saveCustomer);


    app.route("/user/admin")
        .post(userController.saveAdmin);

}