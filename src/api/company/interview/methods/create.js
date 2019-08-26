import Promise from 'bluebird';

import * as models from '../../../../models';
import { ApiError, ensureNumber, wrapRequest } from "../../../../utils";
import { addInterviews } from "../../methods";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function createRequest (req, res, next) {
  return wrapRequest( create, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function create (params) {
  let {
    titleStart,
    descriptionStart,
    titleFinish,
    descriptionFinish,
    duration,
    canSwitchQuestion,
    canEditAnswer,
    canAddComment,
    companyId,
  } = params;

  duration = ensureNumber( duration );
  canSwitchQuestion = Boolean( canSwitchQuestion );
  canEditAnswer = Boolean( canEditAnswer );
  canAddComment = Boolean( canAddComment );

  return await models.Interview.create( {
    titleStart,
    descriptionStart,
    titleFinish,
    descriptionFinish,
    duration,
    canSwitchQuestion,
    canEditAnswer,
    canAddComment,
    companyId
  } );
}