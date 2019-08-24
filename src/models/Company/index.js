import Sequelize from 'sequelize';
import { sequelize } from "../instance";

export const Company = sequelize.define( 'Company', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  key: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  paranoid: true,
  engine: 'INNODB',
  indexes: [ {
    name: 'key_index',
    method: 'BTREE',
    fields: [ 'key' ]
  } ],
} );
