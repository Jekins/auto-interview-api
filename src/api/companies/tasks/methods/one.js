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
    company
  } = params;
  const tasks = await company.getTasks( id );

  if (!tasks.length) {
    throw new ApiError( 'setTasks.not_found', 404 );
  }

  return tasks[ 0 ];
}