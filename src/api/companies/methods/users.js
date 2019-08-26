import { Op } from 'sequelize';

import * as models from '../../../models';
import { ApiError, ensureNumber, wrapRequest } from "../../../utils";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function usersRequest (req, res, next) {
  return wrapRequest( users, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function users (params) {
  let {
    company,
    userEmails = [],
  } = params;

  if (typeof userEmails === 'string') {
    userEmails = userEmails.split( ',' );
  }

  if (!Array.isArray( userEmails )) {
    throw new ApiError( 'invalid_value', 400 );
  }

  let users = await models.User.findAll( {
    where: {
      email: {
        [ Op.in ]: userEmails
      }
    }
  } );

  const userIds = users.map( user => user.id );

  await company.addUsers( userIds ); // TODO: на этом месте надо как-то оповещать пользователя, что его добавили в компанию

  return company.getUsers();
}