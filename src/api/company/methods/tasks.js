import Promise from 'bluebird';

import * as models from '../../../models';
import { wrapRequest } from "../../../utils";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function tasksRequest (req, res, next) {
  return wrapRequest( tasks, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function tasks (params) {
  const {
    companyId
  } = params;

  return models.Task.findAll( {
    where: { companyId }
  } );
}