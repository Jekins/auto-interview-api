import debug from 'debug';
import { sequelize } from "./instance";
import { User } from './User';
import { AuthToken } from './AuthToken';
import { Interview } from "./Interview";
import { Task } from "./Task";

const logger = debug( 'Sequelize' );

export function makeRelations () {
  /**
   * Defining relatives between models
   */
  User.hasMany( AuthToken, { foreignKey: 'userId', targetKey: 'id' } );
  AuthToken.belongsTo( User, { foreignKey: 'userId', targetKey: 'id' } );

  User.hasMany( Interview, { foreignKey: 'authorId', targetKey: 'id', as: 'Author' } );
  Interview.belongsTo( User, { foreignKey: 'authorId', targetKey: 'id', as: 'Author' } );

  Task.belongsToMany( Interview, { through: 'TasksToInterviews', foreignKey: 'taskId', timestamps: false } );
  Interview.belongsToMany( Task, { through: 'TasksToInterviews', foreignKey: 'interviewId', timestamps: false } );

  console.log( 'Sequelize: models are syncing...' );
  return sequelize.sync(/**{ force: true }/**/ ).then( () => {
    console.log( 'Sequelize: models synced!' );
  } ).catch( console.error.bind( console, 'Fatal error:' ) );
}