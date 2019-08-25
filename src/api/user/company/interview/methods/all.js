import Promise from 'bluebird';

import * as models from '../../../../../models';
import { wrapRequest } from "../../../../../utils";

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
  const {
    companyId
  } = params;

  console.log( '___ companyId:', companyId );
  return models.Interview.findAll( {
    where: { companyId }
  } );
}