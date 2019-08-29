import { ApiError, successResponseWrapper, wrapRequest } from "../../../../utils";
import { one } from "./";
import { Op } from "sequelize";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function setTasksRequest (req, res, next) {
  return wrapRequest( setTasks, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function setTasks (params) {
  let {
    company,
    interviewId,
    taskIds = []
  } = params;

  if (!Array.isArray( taskIds )) {
    throw new ApiError( 'invalid_value', 400 );
  }

  const tasks = await company.getTasks( {
    where: {
      id: {
        [ Op.in ]: taskIds
      }
    }
  } );
  const interview = await one( { interviewId, company } );
  const set = await interview.setTasks( tasks );

  return successResponseWrapper( set );
}