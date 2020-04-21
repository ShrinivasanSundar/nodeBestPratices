const{deviceController}=require("../Controller/index")

module.exports=(app)=>{
    app.route("/devices")
    .get(deviceController.getAllDevice)
}