import Promise from 'bluebird';

import { wrapRequest } from "../../../utils";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function getAllRequest (req, res, next) {
  return wrapRequest( getAll, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function getAll (params) {
  const {
    user
  } = params;
  return await user.getCompanies();
}