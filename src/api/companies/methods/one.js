import Promise from 'bluebird';

import { ApiError, wrapRequest } from "../../../utils";
import { getCompany } from "../../middleware";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function oneRequest (req, res, next) {
  return wrapRequest( one, req, res, next );
}

/**
 * @param {*} params
 * @param {*} req
 * @return {Promise<any>|*}
 */
export async function one (params, req) {
  const company = await getCompany( req );

  if (!company) {
    throw ApiError( 'companies.not_found', 404 );
  }

  return company;
}