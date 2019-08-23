import Promise from 'bluebird';

import * as models from '../../../models';
import { ensureString, wrapRequest } from "../../../utils";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function signUpRequest (req, res, next) {
  return wrapRequest( signUp, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function signUp (params) {
  let {
    login,
    firstName,
    lastName,
    password,
  } = params;

  let user = await models.User.findOne( {
    where: {
      login
    }
  } );

  if (user) {
    throw new HttpError( 'Пользователь с таким логином уже существует' )
  }

  firstName = ensureString( firstName );
  lastName = ensureString( lastName );

  user = await models.User.create( {
    login,
    firstName,
    lastName,
    password
  } );

  return user;
}