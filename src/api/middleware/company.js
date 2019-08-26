import Promise from 'bluebird';
import * as models from "../../models";
import { extractAllParams } from "../../utils";
import { Op } from "sequelize";

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
  const company = await getCompany( req );

  if (!company) {
    next();
  }

  req.company = company;

  next();
}

/**
 *
 * @param {any} req
 * @returns {Promise<null|*>}
 */
export async function getCompany (req) {
  const {
    companyId,
    user
  } = extractAllParams( req );

  if (!companyId || !user) {
    return null;
  }

  const companies = await user.getCompanies( {
    where: {
      [ Op.or ]: {
        id: companyId,
        slug: companyId
      }
    }
  } );

  if (!companies.length) {
    return null;
  }

  return companies[ 0 ];
}
