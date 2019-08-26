import Promise from 'bluebird';

import { ensureNumber, wrapRequest } from "../../../utils";
import * as models from '../../../models';

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
    limit = 20,
    offset = 0
  } = params;

  limit = ensureNumber( limit );
  offset = ensureNumber( offset );

  return await user.getCompanies({
    offset,
    limit
  });
}