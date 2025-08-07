import sequelize from "../sequelize.js";
import {DataTypes} from 'sequelize'

const Role = sequelize.define('role', {
    roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
},
    {timestamps: false}
    )

export default Role
