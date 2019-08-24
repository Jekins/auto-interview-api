import Promise from 'bluebird';

import * as models from '../../../models';
import { ApiError, ensureString, wrapRequest } from "../../../utils";

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
  const email = login;

  let user = await models.User.findOne( {
    where: {
      login
    }
  } );

  if (user) {
    throw new ApiError( 'register.user_already_exist', 401 )
  }

  firstName = ensureString( firstName );
  lastName = ensureString( lastName );

  user = await models.User.create( {
    login,
    email,
    firstName,
    lastName,
    password
  } );

  return user;
}