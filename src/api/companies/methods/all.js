import { ensureNumber, getLimitByMax, itemsResponseWrapper, wrapRequest } from "../../../utils";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<any>}
 */
export function allRequest (req, res, next) {
  return wrapRequest( all, req, res, next );
}

/**
 * @param {*} params
 * @return {Promise<any>|*}
 */
export async function all (params) {
  let {
    user,
    limit,
    offset
  } = params;

  limit = getLimitByMax( limit );
  offset = ensureNumber( offset );

  const items = await user.getCompanies( {
    offset,
    limit
  } );
  const total = await user.countCompanies();

  return itemsResponseWrapper( items, total );
}