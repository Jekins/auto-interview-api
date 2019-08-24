import Promise from 'bluebird';

import * as models from '../../../models';
import { ApiError, authExpires, computePasswordHash, generateTokenForUser, wrapRequest } from "../../../utils";
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
 *
 * @param {object} params
 * @param {object} req
 * @param {object} res
 * @returns {Promise<AuthToken.token|{allowNull, type}|*|ServerResponse|String|string>}
 */
export async function signIn (params, req, res) {
  let {
    login,
    password
  } = params;
  const AUTH_COOKIE_NAME = config.auth.cookieName;
  const user = await models.User.findOne( {
    where: {
      login,
      password: computePasswordHash( password )
    }
  } );

  if (!user) {
    throw new ApiError( 'auth.wrong_credentials', 401 );
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