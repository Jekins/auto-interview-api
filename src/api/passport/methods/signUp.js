import Promise from 'bluebird';

import * as models from '../../../models';
import { wrapRequest } from "../../../utils";

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
  const {
    email,
    firstName,
    lastName,
    password,
  } = params;

  let user = await models.User.findOne( {
    where: {
      email
    }
  } );

  if (user) {
    throw new HttpError( 'Пользователь с таким логином уже существует' )
  }

  user = await models.User.create( {
    email,
    firstName,
    lastName,
    password
  } );

  return user;
}