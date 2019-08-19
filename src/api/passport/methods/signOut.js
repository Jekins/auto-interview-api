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
    groupKey
  } = params;

  let groupIds = [];

  let registerLink = await models.RegisterLink.findOne({
    where: {
      registerKey: groupKey
    }
  });

  if (!registerLink || !registerLink.groupId) {
    throw new HttpError( 'Ссылка недействительная' );
  } else if (!registerLink.isActive) {
    throw new HttpError( 'Регистрация по этой ссылке больше невозможна' );
  }

  groupIds.push(registerLink.groupId);

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
  await user.setGroups(groupIds);
  await registerLink.increment('linkActivatedTimes');

  return user;
}