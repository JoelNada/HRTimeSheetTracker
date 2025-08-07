import sequelize from "../sequelize.js";
import {DataTypes} from 'sequelize'

const Employee = sequelize.define('employee', {
    employeeId: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    doj: DataTypes.DATEONLY,
    departmentId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER
},{
    timestamps: false
})

export default Employee;


