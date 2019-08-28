import { authExpires, wrapRequest } from "../../../utils";
import { config } from "../../../config/config";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function signOutRequest (req, res, next) {
  return wrapRequest( signOut, req, res, next );
}

/**
 *
 * @param {*} params
 * @param {*} req
 * @param {*} res
 * @returns {Promise<boolean>}
 */
export async function signOut (params, req, res) {
  res.cookie( config.auth.cookieName, '', {
    expires: authExpires,
    httpOnly: true
  } );

  delete req.session.userId;

  return true;
}