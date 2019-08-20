import Promise from 'bluebird';
import Sequelize from 'sequelize';

import * as models from '../../../models';
import { ensureNumber, ensureString, wrapRequest } from "../../../utils";

const isProduction = process.env.NODE_ENV === 'production';
const Op = Sequelize.Op;

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
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function signOut (params) {
  let {
    email,
    firstName,
    lastName,
    password,
  } = params;

  let groupIds = [];

  groupIds.push(1);

  let user = await models.User.findOne({
    where: {
      email
    }
  });

  if (user) {
    throw new HttpError('Пользователь с таким логином уже существует')
  }

  user = await models.User.create({
    email,
    firstName,
    lastName,
    password
  });
  // await user.setGroups(groupIds);

  return user;
}