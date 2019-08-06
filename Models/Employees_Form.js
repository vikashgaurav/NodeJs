var{mongoose, conn} = require("../Modules/connection");
let  employeesFormSchema  = mongoose.Schema(
    {
        
        employee_name : {
            type : String,
            default : "N/A"  
        },
        employee_id : {
            type : String,
            default : "N/A"  
        },
        employee_department : {
            type : String
        },
        employee_designation : {
            type : String
        },
        reviewer_name : {
            type : String
        },
        reviewer_designation : {
            type : String
        },
        review_date:{
            type: Date,
            default : new Date()
        },
        technical_skill:{
            type: Number
        },
        target_milestone:{
            type: Number
        },
        team_assistance :{
            type: Number
        },
        timeline_managemnt :{
            type: Number
        },
        floor_discipline:{
            type: Number
        },
        attendence :{
            type: Number
        },
        domains_of_project :[],
        area_of_excellence :{
            type: String
        },
        area_of_improvement:{
            type : String
        }
    },
    {
        strict: true,
        collection: 'Employees_Form',
        versionKey: false
    }
    
);
exports.EmployeesFormModel = conn.model('Employees_Form', employeesFormSchema); 
