import Sequelize from 'sequelize';
import { sequelize } from "../instance";

export const Interview = sequelize.define( 'Interview', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  titleStart: {
    type: Sequelize.STRING,
  },
  descriptionStart: {
    type: Sequelize.TEXT,
  },
  titleFinish: {
    type: Sequelize.STRING,
  },
  descriptionFinish: {
    type: Sequelize.TEXT,
  },
  duration: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  canSwitchQuestion: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  canEditAnswer: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  canAddComment: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
}, {
  paranoid: true,
  engine: 'INNODB'
} );