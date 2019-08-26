import Promise from 'bluebird';

import * as models from '../../../../models';
import { ApiError, wrapRequest } from "../../../../utils";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function oneRequest (req, res, next) {
  return wrapRequest( one, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function one (params) {
  const {
    interviewId: id,
    companyId
  } = params;
  const interview = await models.Interview.findOne( {
    where: {
      id,
      companyId
    }
  } );

  if (!interview) {
    throw ApiError( 'interviews.not_found', 404 );
  }

  return interview;
}