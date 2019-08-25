import Promise from 'bluebird';
import * as models from "../../models";
import { extractAllParams } from "../../utils";

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @return {Promise<*>}
 */
export async function companyMiddleware (req, res, next) {
  return Promise.resolve().then( () => {
    return retrieveCompany( req, res, next );
  } ).catch( next );
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export async function retrieveCompany (req, res, next) {
  const { companyId } = extractAllParams( req );

  if (!companyId) {
    next();
  }

  req.company = await models.Company.findByPk( companyId );

  next();
}
