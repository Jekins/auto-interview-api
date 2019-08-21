import debug from 'debug';
import { sequelize } from "./instance";
import { User } from './User';
import { AuthToken } from './AuthToken';

const logger = debug( 'Sequelize' );

export function makeRelations () {
  /**
   * Defining relatives between models
   */
  User.hasMany( AuthToken, { foreignKey: 'userId', targetKey: 'id' } );
  AuthToken.belongsTo( User, { foreignKey: 'userId', targetKey: 'id' } );

  console.log( 'Sequelize: models are syncing...' );
  return sequelize.sync(/**{ force: true }/**/ ).then( () => {
    console.log( 'Sequelize: models synced!' );
  } ).catch( console.error.bind( console, 'Fatal error:' ) );
}