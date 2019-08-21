import Promise from 'bluebird';
import Sequelize from 'sequelize';

import * as models from '../../../models';
import { ensureNumber, ensureString, passwordHash, rememberUser, wrapRequest } from "../../../utils";
import { config } from "../../../config/config";

const isProduction = process.env.NODE_ENV === 'production';
const Op = Sequelize.Op;

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
  const { email, password } = params;

  const user = await models.User.findOne( {
    where: {
      email,
      password: passwordHash( password )
    }
  } );

  if (!user) {
    throw new HttpError( 'Wrong login or password', 401 );
  }

  const tokenInstance = await rememberUser( user );

  res.cookie( AUTH_COOKIE_NAME, tokenInstance.token, {
    expires: new Date( Date.now() + 1e3 * 3600 * 24 * 365 ),
    httpOnly: true
  } );
  req.session.userId = user.id;

  await user.update( {
    lastLoggedTimeMs: Date.now()
  } );

  return tokenInstance.token;
}