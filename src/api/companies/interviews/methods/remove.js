import { successResponseWrapper, wrapRequest } from "../../../../utils";
import { one } from "./";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function removeRequest (req, res, next) {
  return wrapRequest( remove, req, res, next );
}

/**
 * @param {*} params
 * @param {*} req
 * @return {Promise<any>|*}
 */
export async function remove (params, req) {
  const {
    company,
    interviewId
  } = params;

  const interview = await one( { interviewId, company } );
  const removed = await interview.destroy();

  return successResponseWrapper( removed );
}