import Promise from 'bluebird';

import * as models from '../../../../../models';
import { wrapRequest } from "../../../../../utils";

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
    title,
    description,
    companyId
  } = params;

  return models.Task.create( {
    title,
    description,
    companyId
  } );
}