import Promise from 'bluebird';

import * as models from '../../../models';
import { ApiError, wrapRequest } from "../../../utils";
import { users } from "./users";

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
    throw ApiError( 'companies.key.required_filed', 400 );
  }

  if (!name) {
    throw ApiError( 'companies.name.required_filed', 400 );
  }

  let company = await models.Company.findOne( {
    where: { key }
  } );

  if (company) {
    throw new ApiError( 'companies.already_exist', 401 )
  }

  if ((/^\d+$/g).test( key )) {
    throw new ApiError( 'companies.key.only_numbers', 400 )
  }

  if (!(/^[\w&.\-]+$/g).test( key )) {
    throw new ApiError( 'companies.key.invalid_value', 400 )
  }

  company = await models.Company.create( {
    key,
    name,
  } );

  await users( {
    companyId: company.id,
    userEmails: [ user.email ]
  } );

  return company;
}