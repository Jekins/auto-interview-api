import { ApiError, successResponseWrapper, wrapRequest } from "../../../../utils";
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
  const interview = await one( { interviewId, company } );
  const setTasks = await interview.setTasks( tasks ); // FIXME: не перезаписывает и возвращает 2 вложенных массива

  return successResponseWrapper( setTasks );
}