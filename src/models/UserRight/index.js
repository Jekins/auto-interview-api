import Sequelize from 'sequelize';
import { sequelize } from "../instance";

export const UserRight = sequelize.define( 'UserRight', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  accessGroup: {
    type: Sequelize.INTEGER,
  },
}, {
  paranoid: true,
  engine: 'INNODB',
} );