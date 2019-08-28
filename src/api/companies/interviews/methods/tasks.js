import { Op } from "sequelize";

import * as models from '../../../../models';
import { ApiError, ensureNumber, wrapRequest } from "../../../../utils";
import { one } from "./one";

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
    company,
    interviewId,
    taskIds = []
  } = params;
  if (!Array.isArray( taskIds )) {
    throw new ApiError( 'invalid_value', 400 );
  }

  const tasks = await company.getTasks( taskIds );
  taskIds = tasks.map( task => task.id );
  console.log( '___ taskIds:', taskIds );

  const interview = await one( { interviewId, company } );
  const settasks = await interview.setTasks( taskIds ); // TODO: не удаляются при пустом массиве?!

  return  settasks || [];
}