import { ensureNumber, wrapRequest } from "../../../../utils";

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
    company
  } = params;

  duration = ensureNumber( duration );
  canSwitchQuestion = Boolean( canSwitchQuestion );
  canEditAnswer = Boolean( canEditAnswer );
  canAddComment = Boolean( canAddComment );

  return company.createInterview( {
    titleStart,
    descriptionStart,
    titleFinish,
    descriptionFinish,
    duration,
    canSwitchQuestion,
    canEditAnswer,
    canAddComment,
  } );
}