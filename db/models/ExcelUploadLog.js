import sequelize from "../sequelize.js"
import { DataTypes } from "sequelize"

const ExcelUploadLog = sequelize.define('excelUpload', {
    uploadId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    originalName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    storedPath: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uploadType: {
        type: DataTypes.ENUM('employees', 'timesheets'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'success', 'failed'),
        defaultValue: 'pending'
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true // adds createdAt and updatedAt
});

export default ExcelUploadLog;