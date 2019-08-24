import { Op } from 'sequelize';

import * as models from '../../../models';
import { ApiError, ensureNumber, wrapRequest } from "../../../utils";

const { Company } = models;

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function linkRequest (req, res, next) {
  return wrapRequest( link, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function link (params) {
  let {
    companyId,
    userEmails = []
  } = params;

  companyId = ensureNumber( companyId );

  if (typeof userEmails === 'string') {
    userEmails = userEmails.split( ',' );
  }

  if (!Array.isArray( userEmails ) || !companyId) {
    throw new ApiError( 'invalid_value', 400 );
  }

  const company = await Company.findByPk( companyId );

  if (!company) {
    throw new ApiError( 'company.not_found', 404 );
  }

  let users = await models.User.findAll({
    where: {
      email: {
        [Op.in]: userEmails
      }
    }
  });

  const userIds = users.map( user => user.id );

  await company.addUsers( userIds ); // TODO: на этом месте надо как-то оповещать пользователя, что его добавили в компанию

  return company.getUsers();
}