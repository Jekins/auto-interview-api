import { Op } from 'sequelize';

import * as models from '../../../models';
import { ApiError, successResponseWrapper, wrapRequest } from "../../../utils";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function removeUsersRequest (req, res, next) {
  return wrapRequest( removeUsers, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function removeUsers (params) {
  let {
    user,
    company,
    users = [],
  } = params;

  if (!Array.isArray( users )) {
    throw new ApiError( 'invalid_value', 400 );
  }

  const userEmails = users.map( user => user.email );

  users = await models.User.findAll( {
    where: {
      [ Op.and ]: {
        email: {
          [ Op.in ]: userEmails
        },
        id: {
          [ Op.not ]: user.id // TODO: надо подумать над тем, что можно удалить другого админа
        }
      }
    }
  } );

  const removed = await company.removeUsers( users );

  return successResponseWrapper( removed );
}