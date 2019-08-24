import * as models from '../../../models';
import { ApiError, ensureNumber, getOnlyNumberIds, wrapRequest } from "../../../utils";
import { Op } from "sequelize";

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

  const tasks =  await models.Task.findAll( {
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
    throw new ApiError( 'interview.not_found', 404 );
  }

  await interview.addTasks( taskIds );

  return interview.getTasks();
}