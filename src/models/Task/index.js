import Sequelize from 'sequelize';
import { sequelize } from "../instance";

export const Task = sequelize.define( 'Task', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT,
  },
}, {
  paranoid: true,
  engine: 'INNODB',
} );