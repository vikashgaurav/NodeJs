var commFunc = require ('../Modules/commonFunction');
var responses = require ('../Modules/responses');
var constant = require ('../Modules/constant');
var config = require ('../Config/production')
const {UserModel} = require('../Models/userModel')
var md5 = require ('md5');
var typeOf = require ('typeof');
var _ = require ("lodash");
var async = require ('async');
var uniqid = require ('uniqid');
const Joi = require('joi');
var geodist = require('geodist')
const XLSX = require('xlsx')
const {DepartmentModel} = require("../Models/Department")
const {EmployeesModel} = require("../Models/Employees")
const {EmployeesFormModel} = require("../Models/Employees_Form")


/*---------------------------------------
++++++++++ generateSecrateCode ++++++++++
----------------------------------------*/

exports.generateSecrateCode = async(req, res) => {
	try {
		let secrate_key = uniqid('sec-');
		res.status(200).json({secrate_key}, "Your secrate key.")
	} catch(error) {
		res.status(403).json(error.message)
	}
}