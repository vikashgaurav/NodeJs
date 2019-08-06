var connection = require( './connection');
var responses  = require('./responses');
const { UserModel} =  require('../Models/userModel');
// const { driverModel} =  require('../Model/driver_model');
const { AdminModel}=require('../Models/adminModel')
exports.requiresLogin = async (req, res, next) => {
    console.log("auth calling")
    let {access_token} = req.headers;
    if(access_token) {
        let user = await UserModel.findOne({access_token})
        if(!user) {
            (responses.authenticationErrorResponse(res));
            return;
        }
        //console.log(user)
        req.userData = user;
        next();
    } else {
        (responses.parameterMissingResponse(res));
        return
    }
}


exports.requiresLoginAdmin = (req, res, next) => {
    
    let { access_token } = req.headers;
    
    if (access_token) {
        AdminModel.findOne({access_token})
        .then(result => {
           if (result) {
            req.adminData = result;
            next();
            } else {
                responses.authenticationErrorResponse(res);
            }
        }).catch(err => {console.log(err);responses.sendError(err.message, res)})
    } else {
        (responses.parameterMissingResponse(res));
        return ;
    }
}