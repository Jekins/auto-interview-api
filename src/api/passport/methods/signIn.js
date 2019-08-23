import Promise from 'bluebird';

import * as models from '../../../models';
import { authExpires, computePasswordHash, generateTokenForUser, wrapRequest } from "../../../utils";
import { config } from "../../../config/config";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function signInRequest (req, res, next) {
  return wrapRequest( signIn, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function signIn (params, req, res) {
  const AUTH_COOKIE_NAME = config.auth.cookieName;
  const { login, password } = params;

  const user = await models.User.findOne( {
    where: {
      login,
      password: computePasswordHash( password )
    }
  } );

  if (!user) {
    throw new HttpError( 'Wrong login or password', 401 );
  }

  const tokenInstance = await generateTokenForUser( user );

  res.cookie( AUTH_COOKIE_NAME, tokenInstance.token, {
    expires: authExpires,
    httpOnly: true
  } );

  req.session.userId = user.id;

  await user.update( {
    lastLoggedTimeMs: Date.now()
  } );

  return tokenInstance.token;
}