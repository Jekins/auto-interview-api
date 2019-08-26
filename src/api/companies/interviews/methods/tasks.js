import { Op } from "sequelize";

import * as models from '../../../../models';
import { ApiError, ensureNumber, wrapRequest } from "../../../../utils";

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
  let {
    interviewId,
    taskIds = []
  } = params;

  if (typeof taskIds === 'string') {
    taskIds = taskIds.split( ',' );
  }

  if (!Array.isArray( taskIds )) {
    throw new ApiError( 'invalid_value', 400 );
  }

  const tasks = await models.Task.findAll( {
    where: {
      id: {
        [ Op.in ]: taskIds
      }
    }
  } );

  taskIds = tasks.map( user => user.id );
  interviewId = ensureNumber( interviewId );

  const interview = await models.Interview.findByPk( interviewId );

  if (!interview) {
    throw new ApiError( 'interviews.not_found', 404 );
  }

  await interview.addTasks( taskIds );

  return interview.getTasks();
}