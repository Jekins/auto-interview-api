import Promise from 'bluebird';

import { wrapRequest } from "../../../utils";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function companiesRequest (req, res, next) {
  return wrapRequest( companies, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function companies (params) {
  const {
    user
  } = params;
  return await user.getCompanies();
}