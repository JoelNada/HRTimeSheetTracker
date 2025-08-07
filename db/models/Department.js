import sequelize from "../sequelize.js";
import {DataTypes} from 'sequelize'

const Department = sequelize.define('department', {
    departmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
},{timestamps: false}
    )

export default Department