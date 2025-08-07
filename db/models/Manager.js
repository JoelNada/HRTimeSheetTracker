import sequelize from "../sequelize.js";
import {DataTypes} from 'sequelize'

const Manager = sequelize.define('manager', {
    managerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
},
    {timestamps: false}
    )

export default Manager