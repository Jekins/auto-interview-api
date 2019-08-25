import Promise from 'bluebird';

import * as models from '../../../models';
import { ApiError, wrapRequest } from "../../../utils";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function getMeRequest (req, res, next) {
  return wrapRequest( getMe, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function getMe (params) {
  return params.user;
}