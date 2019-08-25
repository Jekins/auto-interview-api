import Promise from 'bluebird';

import * as models from '../../../models';
import { ApiError, wrapRequest } from "../../../utils";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function getOneByIdRequest (req, res, next) {
  return wrapRequest( getOneById, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function getOneById (params) {
  const {
    companyId
  } = params;
  const company =  await models.Company.findByPk( companyId );

  if (!company) {
    throw ApiError( 'company.not_found', 404 );
  }

  return company;
}