import Sequelize from 'sequelize';
import { sequelize } from "../instance";

export const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  displayName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});