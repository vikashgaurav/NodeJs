var commFunc = require('../Modules/commonFunction');
var responses = require('../Modules/responses');
const { AdminModel}=require('../Models/adminModel')
var md5 = require('md5');
var _ = require("lodash");
const Joi = require('joi');
var jwt = require('jsonwebtoken');
const {UserModel} = require('../Models/userModel')
const {DepartmentModel} = require("../Models/Department")
const {EmployeesModel} = require("../Models/Employees")
const {EmployeesFormModel} = require("../Models/Employees_Form")


exports.login = async (req, res) => {
    try {

        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
            device_token: Joi.string().allow("").optional(),
            device_type: Joi.number().allow("").optional()
        })

        const result = Joi.validate(req.body, schema, { abortEarly: true });
        if (result.error) {
            if (result.error.details && result.error.details[0].message) {
                responses.parameterMissing(res, result.error.details[0].message);
                return;
            } else {
                responses.parameterMissing(res, result.error.message);
                return;
            }
        }

        var { email, password, device_token, device_type } = req.body
        console.log(req.body)

        let userData = await AdminModel.findOne({ email })
        if (userData) {
            console.log(userData)

            if (userData.get('password') === md5(password)) {
                var access_token = jwt.sign({ access: 'access-' }, "fluper") 
                let is_verified = 1
                var updateData = { access_token, is_verified, device_type, device_token }
                var userResult = await AdminModel.findByIdAndUpdate(userData.get('_id'), { $set: updateData }, { new: true })
                if (userResult) {
                    res.status(200).json({ message: "Login successfully", response: userResult });
                } else {
                    res.status(403).json({ message: 'Email not registered' });
                }
            } else {
                res.status(403).json({ message: 'Invalid password' });
            }
        } else {
            res.status(403).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        res.status(403).appError(error.message);
    }
}


exports.getAdminDetail = async (req, res) => {
    let adminData = await AdminModel.find({_id:req.body._id},{},{lean:true})
    if (adminData) {
        console.log(adminData)
        res.status(200).json({ response: adminData })
    } else {
        res.status(404).json({ message: "Data not found" })
    }
}

exports.edit_profile = async (req, res) => {
    try {
        var access_token = req.adminData.access_token
        console.log(req.adminData)
        var { First_Name, Last_Name, mobile_number,  Description,country } = req.body
        var data = { First_Name, Last_Name, mobile_number,  Description,country }
        console.log(data)
        if (req.files.length > 0) {
            req.files.forEach(file => {
                data[file.fieldname] = `/Admin/${file.filename}`;
            });
        }
        let userData = await AdminModel.findOneAndUpdate({ access_token }, { $set: data }, { new: true })
        if (userData) {
            console.log(userData)
            res.status(200).json({ message: "Profile edited successfully", response: userData })
        } else {
            res.status(404).json({ message: "Invalid credential" })
        }
    } catch (error) {
        res.status(403).appError(error.message);
    }
}


exports.change_password = async (req, res) => {
    try {

        var access_token = req.adminData.access_token
        var passwordb = req.adminData.password;
        var { old_password, new_password } = req.body

        if (passwordb == md5(old_password)) {

            let userData = await AdminModel.findOneAndUpdate({ access_token }, { $set: { password: md5(new_password) } }, { new: true })
            if (userData) {
                res.status(200).json({ message: "Password changed successfully", response: userData })
            } else {
                res.status(404).json({ message: "Invalid credentials" })
            }
        } else {
            res.status(404).json({ message: "Incorrect old password" })
        }
    } catch (error) {
        res.status(403).json({message : error.message});
    }
}

exports.forget_password = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
        })
        const result = Joi.validate(req.body, schema, { abortEarly: true });
        if (result.error) {
            if (result.error.details && result.error.details[0].message) {
                responses.parameterMissing(res, result.error.details[0].message);
                return;
            } else {
                responses.parameterMissing(res, result.error.message);
                return;
            }
        }
        var { email } = req.body;
        console.log(req.body)
        let userData = await AdminModel.findOne({ email })
        if (userData) {
            let verification_code = "1234"
            let forgetPasswordValidation = md5(new Date());
            let userResult = await AdminModel.findByIdAndUpdate(userData.get('_id'), { $set: { verification_code } }, { new: true })
            if (userResult) {
                let subject = "Dyn verfiaction code"
                let message = "verification code"
                commFunc.sendmail(verification_code, email, subject, message);
                res.status(200).json({ message: "Verification code is sent to the mail", response: userResult })
            } else {
                res.status(404).json({ message: "Email isnt registered" })
            }
        } else {
            res.status(404).json({ message: "Email isnt registered" })
            
        }
    } catch (error) {
        res.status(403).appError(error.message);
    }
}

exports.verifyOTP = async (req, res) => {
    try {
        var { verification_code } = req.body;
        var { access_token } = req.headers;
        let userData = await AdminModel.findOne({ access_token })
        if (userData) {
            if (userData.get('verification_code') === verification_code) {
                verification_code = ""
                is_verified = 1
                let updateData = { verification_code, is_verified }
                let userResult = await AdminModel.findOneAndUpdate({ access_token }, { $set: updateData }, { new: true })
                if (userResult) {
                    res.status(200).json({ message: "OTP verified", response: userResult })
                } else {
                    res.status(404).json({ message: "Invalid credentials" })
                }
            } else {
                res.status(404).json({ message: "Invalid credentials" })
            }
        } else {
            res.status(404).json({ message: "Invalid credentials" })
        }
    } catch (error) {
        res.status(403).appError(error.message);
    }
}

exports.reset_password = async (req, res) => {
    try {
        var { password } = req.body;
        var { access_token } = req.headers;
        let userResult = await AdminModel.findOneAndUpdate({ access_token }, { $set: { password: md5(password) } }, { new: true })
        if (userResult) {
            res.status(200).json({ message: "Reset password successfully", response: userResult })

        } else {
            res.status(404).json({ message: "Invalid credentials" })
        }
    } catch (error) {
        res.status(403).appError(error.message);
    }
}

exports.admin_dashboard = async(req, res)=>{
    try{
    var allemp = await EmployeesModel.count({})
    var allForm = await EmployeesFormModel.count({})
    var allUser = await AdminModel.count({})
    var alldpt = await DepartmentModel.findOne()
    res.status(200).json({allEmployee : allemp, allForm : allForm, allUser : allUser-1, alldpt : alldpt.department.length})

    }catch(err){
        res.status(400).json({message : err.message})
    }
}


