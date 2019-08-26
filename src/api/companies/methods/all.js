import Promise from 'bluebird';

import { ensureNumber, getLimitByMax, wrapRequest } from "../../../utils";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function allRequest (req, res, next) {
  return wrapRequest( all, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function all (params) {
  let {
    user,
    limit,
    offset
  } = params;

  limit = getLimitByMax( limit );
  offset = ensureNumber( offset );

  return await user.getCompanies( {
    offset,
    limit
  } );
}