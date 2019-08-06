var{mongoose, conn} = require("../Modules/connection");
let  departmentSchema  = mongoose.Schema(
    {
        
        department : []
    },
    {
        strict: true,
        collection: 'Department',
        versionKey: false
    }
    
);
exports.DepartmentModel = conn.model('Department', departmentSchema); 
