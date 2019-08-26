import Promise from 'bluebird';

import * as models from '../../../../models';
import { ApiError, wrapRequest } from "../../../../utils";

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
 * @return {Promise<any>|*}
 */
export async function one (params) {
  const {
    taskId: id,
    companyId
  } = params;
  const task = await models.Task.findOne( {
    where: {
      id,
      companyId
    }
  } );

  if (!task) {
    throw ApiError( 'tasks.not_found', 404 );
  }

  return task;
}