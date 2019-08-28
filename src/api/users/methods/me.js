import { wrapRequest } from "../../../utils";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function meRequest (req, res, next) {
  return wrapRequest( me, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function me (params) {
  return params.user;
}