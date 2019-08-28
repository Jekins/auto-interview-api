import Promise from 'bluebird';
import { ApiError, ensureNumber, extractAllParams } from "../../utils";
import { Op } from "sequelize";
import * as models from '../../models';
import groupsUtils from "../../utils/groups-utils";

export function companyMiddleware () {
  return async (req, res, next) => {
    const company = await getCompany( req );

    if (!company) {
      return next( new ApiError( 'companies.not_found', 404 ) );
    }

    req.company = company;

    next();
  };
}

/**
 *
 * @param {any} req
 * @returns {Promise<null|*>}
 */
export async function getCompany (req) {
  let {
    companyId
  } = extractAllParams( req );

  return models.Company.findOne( {
    where: {
      [ Op.or ]: {
        id: ensureNumber( companyId ),
        slug: companyId
      }
    }
  } );
}
