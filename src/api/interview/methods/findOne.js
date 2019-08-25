import Promise from 'bluebird';

import * as models from '../../../models';
import { ApiError, wrapRequest } from "../../../utils";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function findOneRequest (req, res, next) {
  return wrapRequest( findOne, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function findOne (params) {
  const {
    interviewId: id,
    companyId
  } = params;
  const interview =  await models.Interview.findOne( {
    where: {
      id,
      companyId
    }
  } );

  if (!interview) {
    throw ApiError( 'interview.not_found', 404 );
  }

  return interview;
}