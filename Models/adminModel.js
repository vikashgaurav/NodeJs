var { mongoose, conn } = require("../Modules/connection");
let adminSchema = mongoose.Schema(
    {
        access_token: {
            type: String,
            require: true
        },

        email: {
            type: String,
        },
        password: {
            type: String,
        },
        admin_id: {
            type: String
        },
       
        profile_image: {
            type: String,
            default: null
        },
        verification_code: {
            type: String,
        },
        is_verified: {
            type: Number,
            default: 0
        },
        First_Name: {
            type: String,

        },
        Last_Name: {
            type: String,
        },
        city: {
            type: String,
        },
        country:{
            type:String
        },
        Description: {
            type: String
        },
        mobile_number: {
            type: String,
        },
        country_code:{
            type:String,
        },
        device_token: {
            type: String
        },
        key:{
            type:Number,
            default:1
        },
        currency:{
            type:String,
            default:""
        },
        device_type: {
            type: Number //1= Android, 2= IOS
        },
        is_user:{
            type : Boolean,
            default : false
        },
        super_admin :{
            type : Boolean,
            default : true
        },
        role :{
            type: String,
            enum : ['ALL','VIEW/EDIT', 'VIEW'],
            default : 'ALL'
        }
     

    },
    {
        strict: true,
        collection: 'Admin',
        versionKey: false
    }

);

exports.AdminModel = conn.model('Admin', adminSchema); 
