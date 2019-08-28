import Sequelize from 'sequelize';
import { computePasswordHash } from '../../utils';
import { sequelize } from "../instance";

export const User = sequelize.define( 'User', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set (value) {
      this.setDataValue( 'password', computePasswordHash( value ) );
    },
    get () {
      return '(hidden)';
    }
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  recentActivityTimeMs: {
    type: Sequelize.BIGINT( 15 ).UNSIGNED,
    defaultValue: () => new Date().getTime()
  },
  lastLoggedTimeMs: {
    type: Sequelize.BIGINT( 15 ).UNSIGNED,
    defaultValue: () => new Date().getTime()
  },
  registerTimeMs: {
    type: Sequelize.BIGINT( 15 ).UNSIGNED,
    defaultValue: () => new Date().getTime()
  }
}, {
  getterMethods: {
    // fullName () {
    //   const placeholder = '{firstName} {lastName}';
    //
    //   return [ 'firstName', 'lastName' ].reduce( (placeholder, key) => {
    //     const regexp = new RegExp( `\{${ key }\}`, 'gi' );
    //
    //     return placeholder.replace( regexp, this[ key ] );
    //   }, placeholder ).trim();
    // },
    // isAdmin () {
    //   if (!this.accessGroup) {
    //     return false;
    //   }
    //   return userGroups.utils.hasRight(
    //     this.accessGroup,
    //     userGroups.groups.admin.mask
    //   );
    // }
  },
  setterMethods: {
    fullName (value) {
      const names = (value || '').trim().split( /\s+/ );

      while (names.length !== 2) {
        (
          names.length > 2
            ? names.pop
            : names.push.bind( this, '-' )
        )();
      }

      this.setDataValue( 'firstName', names.slice( 0, -1 ).join( ' ' ) );
      this.setDataValue( 'lastName', names.slice( -1 ).join( ' ' ) );
    }
  },
  paranoid: true,
  engine: 'INNODB',
  scopes: {
    deleted: {
      where: {
        deletedAt: {
          $ne: null
        }
      }
    },
    // accessGroup (...args) {
    //   let groups = userGroups.utils.resolveAllGroups( ...args );
    //
    //   return {
    //     where: {
    //       accessGroup: {
    //         $in: groups.map( group => group.mask )
    //       }
    //     }
    //   }
    // }
  },
  instanceMethods: {
    // hasRight (mask) {
    //   return userGroups.utils.hasRight(
    //     this.accessGroup,
    //     mask
    //   );
    // },
    // arePasswordsEqual (password) {
    //   return this.getDataValue( 'password' ) === password;
    // },
    // setPasswordHash (hash) {
    //   this.setDataValue( 'password', hash );
    // },
    // getPasswordHash () {
    //   this.getDataValue( 'password' );
    // }
  }
} );
