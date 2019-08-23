import Promise from 'bluebird';

import * as models from '../../../models';
import { ApiError, ensureNumber, wrapRequest } from "../../../utils";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function linkRequest (req, res, next) {
  return wrapRequest( link, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function link (params) {
  let { interviewId, taskIds = [] } = params;

  if (typeof taskIds === 'string') {
    taskIds = taskIds.split( ',' );
  }

  taskIds = taskIds.map( Number ).filter( v => !Number.isNaN( v ) );

  if (!Array.isArray( taskIds )) {
    throw new ApiError( 'invalid_value', 400 );
  }

  interviewId = ensureNumber( interviewId );

  const interview = await models.Interview.findByPk( interviewId );

  if (!interview) {
    throw new ApiError( 'interview.not_found', 404 );
  }

  // return Object.keys( interview.__proto__ );

  await interview.setTasks( taskIds );

  return interview.getTasks();
}