import * as models from '../../models';

const usersMap = new Map();

/**
 * @param {*} userObject
 * @return {Promise<Entry>}
 */
export async function findOrCreateUser (userObject) {
  let user = null;

  if (usersMap.has( userObject.displayName )) {
    user = usersMap.get( userObject.displayName );
  } else {
    [ user ] = await models.User.findOrCreate({
      where: {
        displayName: userObject.displayName
      },
      defaults: {
        displayName: userObject.displayName,
      }
    });

    usersMap.set( userObject.displayName, user );
  }

  return user;
}