import Promise from 'bluebird';

import * as models from '../../../../models';
import { ensureNumber, getLimitByMax, wrapRequest } from "../../../../utils";

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
    companyId,
    limit,
    offset
  } = params;

  limit = getLimitByMax( limit );
  offset = ensureNumber( offset );

  return models.Task.findAll( {
    where: { companyId },
    limit,
    offset
  } );
}