var admin = require('../Controllers/adminController');
var multer = require('multer');
var md5 = require('md5');
var express = require('express')
var path = require('path');
var auth = require("../Modules/auth")

exports.getRouter = (app) => {

    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            console.log("multer")
            console.log(file)
            callback(null, './Upload/Admin');
        },
        filename: function (req, file, callback) {
            let fileUniqueName = md5(Date.now());
            callback(null, fileUniqueName + path.extname(file.originalname));
        }
    });
    let upload = multer({ storage: storage });

    app.route("/admin/login").post(admin.login)
    app.route("/admin/getAdminDetail").post(admin.getAdminDetail)
    app.route("/admin/forget_password").post(admin.forget_password)
    
    app.route("/admin/verifyOTP").post(admin.verifyOTP)    
    app.route("/admin/reset_password").post( admin.reset_password)
    app.route("/admin/change_password").post(auth.requiresLoginAdmin,admin.change_password)
    app.route("/admin/edit_profile").post(auth.requiresLoginAdmin, upload.any(), admin.edit_profile)

}