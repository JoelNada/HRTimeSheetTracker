import sequelize from "../sequelize.js"
import {DataTypes} from "sequelize";

const HrTimeSheet = sequelize.define("hrTimeSheet", {
    employeeId: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    email: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATEONLY, allowNull: false},
    task: {type: DataTypes.STRING, allowNull: false},
    hours:{type:DataTypes.FLOAT, allowNull: false},
},
{
    timestamps: false,
}
)

export default HrTimeSheet;