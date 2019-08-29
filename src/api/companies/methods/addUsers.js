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
export function addUsersRequest (req, res, next) {
  return wrapRequest( addUsers, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function addUsers (params) {
  let {
    company,
    users = [],
  } = params;

  if (!Array.isArray( users )) {
    throw new ApiError( 'invalid_value', 400 );
  }

  const userEmails = users.map( user => user.email );
  const userGroups = users.map( user => user.group );

  users = await models.User.findAll( {
    where: {
      email: {
        [ Op.in ]: userEmails
      }
    }
  } ); // TODO: если пользователя не найдет в базе, то надо регистрировать нового по этому емеилу

  const add = await company.addUsers( users, {
    through: {
      accessGroup: groups.user.mask // TODO: надо потом сделать возможность сразу задать каждому пользователю свою группу
    }
  } ); // TODO: на этом месте надо как-то оповещать пользователя, что его добавили в компанию

  return successResponseWrapper( add );
}