import Promise from 'bluebird';

import * as models from '../../../models';
import { wrapRequest } from "../../../utils";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function interviewsRequest (req, res, next) {
  return wrapRequest( interviews, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function interviews (params) {
  const {
    companyId
  } = params;

  return models.Interview.findAll( {
    where: { companyId }
  } );
}