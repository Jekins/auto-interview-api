import Sequelize from 'sequelize';
import { sequelize } from "../instance";

export const UserRight = sequelize.define( 'UserRight', {
  accessGroup: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
}, {
  paranoid: true,
  engine: 'INNODB',
  timestamps: false,
} );