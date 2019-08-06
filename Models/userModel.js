var{mongoose, conn} = require("../Modules/connection");
let  userSchema  = mongoose.Schema(
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
        is_user:{
            type : Boolean,
            default : true
        },
        device_type: {
            type: Number //1= Android, 2= IOS
        },
        role :{
            type: String,
            enum : ['ALL', 'VIEW'],
            default : 'VIEW'
        }

    },
    {
        strict: true,
        collection: 'User',
        versionKey: false
    }
    
);
//exports.userSchema = userSchema;
exports.UserModel = conn.model('User', userSchema); 
