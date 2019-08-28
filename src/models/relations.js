import debug from 'debug';

import * as models from '../models';
import { sequelize } from "./instance";

const logger = debug( 'Sequelize' );
const { User, Company, Interview, Task, AuthToken, UserRight } = models;

export function makeRelations () {
  /**
   * Defining relatives between models
   */
  User.hasMany( AuthToken, { foreignKey: 'userId', targetKey: 'id' } );
  AuthToken.belongsTo( User, { foreignKey: 'userId', targetKey: 'id' } );

  User.belongsToMany( Company, { through: UserRight, foreignKey: 'userId', timestamps: false } );
  Company.belongsToMany( User, { through: UserRight, foreignKey: 'companyId', timestamps: false } );

  Company.hasMany( Interview, { foreignKey: 'companyId', targetKey: 'id' } );
  Interview.belongsTo( Company, { foreignKey: 'companyId', targetKey: 'id' } );

  Company.hasMany( Task, { foreignKey: 'companyId', targetKey: 'id' } );
  Task.belongsTo( Company, { foreignKey: 'companyId', targetKey: 'id' } );

  Task.belongsToMany( Interview, { through: 'TasksToInterviews', foreignKey: 'taskId', timestamps: false } );
  Interview.belongsToMany( Task, { through: 'TasksToInterviews', foreignKey: 'interviewId', timestamps: false } );

  console.log( 'Sequelize: models are syncing...' );
  return sequelize.sync( /**{ force: true }/**/ ).then( () => {
    console.log( 'Sequelize: models synced!' );
  } ).catch( console.error.bind( console, 'Fatal error:' ) );
}