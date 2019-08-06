var{mongoose, conn} = require("../Modules/connection");
let  employeesSchema  = mongoose.Schema(
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
        }

    },
    {
        strict: true,
        collection: 'Employees',
        versionKey: false
    }
    
);
exports.EmployeesModel = conn.model('Employees', employeesSchema); 
