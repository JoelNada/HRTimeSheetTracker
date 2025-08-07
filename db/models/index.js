import Employee from "./Employee.js";
import Manager from "./Manager.js";
import User from "./User.js";
import Role from "./Role.js";
import Department from "./Department.js";
import ExcelUploadLog from "./ExcelUploadLog.js";

const models = {Employee, Manager, User, Role, ExcelUploadLog};

Employee.belongsTo(Department,{
    foreignKey: 'departmentId',
    targetKey: 'departmentId',
})
Employee.belongsTo(Role, {
    foreignKey: 'roleId',
    targetKey: 'roleId'
});
Employee.belongsTo(Manager, {
    foreignKey: 'managerId',
    targetKey: 'managerId'
});


export default models;