import debug from 'debug';
import { sequelize } from "./instance";
import { User } from './User';
import { AuthToken } from './AuthToken';
import { Group } from './Group';

const logger = debug( 'Sequelize' );

export function makeRelations () {
  /**
   * Defining relatives between models
   */
  User.hasMany(AuthToken, { foreignKey: 'userId', targetKey: 'id' });
  AuthToken.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

  User.belongsToMany(Group, {
    through: 'UsersToGroups',
    timestamps: false,
    foreignKey: 'userId'
  });
  Group.belongsToMany(User, {
    through: 'UsersToGroups',
    timestamps: false,
    foreignKey: 'groupId'
  });

  console.log( 'Sequelize: models are syncing...' );
  return sequelize.sync(/**{ force: true }/**/).then(() => {
    console.log( 'Sequelize: models synced!' );
  }).catch( console.error.bind( console, 'Fatal error:' ) );
}