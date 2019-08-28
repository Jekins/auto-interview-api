import { ApiError, ensureNumber, wrapRequest } from "../../../../utils";

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
    interviewId,
    company
  } = params;
  const interviews = await company.getInterviews( interviewId );

  if (!interviews.length) {
    throw new ApiError( 'interviews.not_found', 404 );
  }

  return interviews[ 0 ];
}