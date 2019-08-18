import debug from 'debug';
import { sequelize } from "./instance";
import { User } from './User';

const logger = debug( 'Sequelize' );

export function makeRelations () {
  /**
   * Defining relatives between models
   */
  // User.hasOne(Entry, { foreignKey: 'userId' });

  console.log( 'Sequelize: models are syncing...' );
  return sequelize.sync(/**{ force: true }/**/).then(() => {
    console.log( 'Sequelize: models synced!' );
  }).catch( console.error.bind( console, 'Fatal error:' ) );
}