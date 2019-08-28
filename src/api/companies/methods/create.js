import * as models from '../../../models';
import { ApiError, wrapRequest } from "../../../utils";
import { groups } from "../../../utils/constants";

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
    name,
    slug,
    user
  } = params;

  if (!slug) {
    throw ApiError( 'companies.slug.required_field', 400 );
  }

  if ((/^\d+$/g).test( slug )) {
    throw new ApiError( 'companies.slug.only_numbers', 400 )
  }

  if (!(/^[\w&.\-]+$/g).test( slug )) {
    throw new ApiError( 'companies.slug.invalid_value', 400 )
  }

  if (!name) {
    throw ApiError( 'companies.name.required_field', 400 );
  }

  const hasCompany = await models.Company.findOne( {
    where: { slug }
  } );

  if (hasCompany) {
    throw new ApiError( 'companies.already_exist', 401 );
  }

  return user.createCompany( {
    slug,
    name,
  }, {
    through: {
      accessGroup: groups.admin.mask
    }
  } );
}