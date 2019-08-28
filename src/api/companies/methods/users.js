import { Op } from 'sequelize';

import * as models from '../../../models';
import { ApiError, successResponseWrapper, wrapRequest } from "../../../utils";
import { groups } from "../../../utils/constants";

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
    users = [],
  } = params;

  if (!Array.isArray( users )) {
    throw new ApiError( 'invalid_value', 400 );
  }

  const userEmails = users.map( user => user.email );

  users = await models.User.findAll( {
    where: {
      email: {
        [ Op.in ]: userEmails
      }
    }
  } ); // TODO: если пользователя не найдет в базе, то надо регистрировать нового по этому емеилу

  const addUsers = await company.addUsers( users, {
    through: {
      accessGroup: groups.user.mask // TODO: надо потом сделать возможность сразу задать каждому пользователю свою группу
    }
  } ); // TODO: на этом месте надо как-то оповещать пользователя, что его добавили в компанию

  return successResponseWrapper( addUsers );
}