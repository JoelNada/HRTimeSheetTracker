import sequelize from '../sequelize.js';
import { DataTypes } from 'sequelize';

const HrTimeSheet = sequelize.define(
  'hrTimeSheet',
  {
    timesheetId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hours: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['employeeId', 'date', 'task'],
      },
    ],
  },
);

export default HrTimeSheet;
