import { successResponseWrapper, wrapRequest } from "../../../utils";

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
    company
  } = params;

  const removed = await company.destroy();

  return successResponseWrapper( removed );
}