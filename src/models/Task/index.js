import Sequelize from 'sequelize';
import { sequelize } from "../instance";

export const Task = sequelize.define( 'Task', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  externalId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  toDo: {
    type: Sequelize.TEXT,
  },
  condition: {
    type: Sequelize.TEXT,
  },
}, {
  paranoid: true,
  engine: 'INNODB',
  indexes: [ {
    name: 'externalId_index',
    method: 'BTREE',
    fields: [ 'externalId' ]
  } ]
} );