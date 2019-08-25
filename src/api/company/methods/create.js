import Promise from 'bluebird';

import * as models from '../../../models';
import { ApiError, wrapRequest } from "../../../utils";
import { link } from "./link";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function createRequest (req, res, next) {
  return wrapRequest( create, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function create (params) {
  let {
    name,
    key,
    user,
  } = params;

  if (!key) {
    throw ApiError( 'company.key.required_filed', 400 );
  }

  if (!name) {
    throw ApiError( 'company.name.required_filed', 400 );
  }

  let company = await models.Company.findOne( {
    where: { key }
  } );

  if (company) {
    throw new ApiError( 'company.user_already_exist', 401 )
  }

  company = await models.Company.create( {
    key,
    name,
  } );

  await link( {
    companyId: company.id,
    userEmails: [ user.email ]
  } );

  return company;
}