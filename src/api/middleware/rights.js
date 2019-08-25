import deap from 'deap';

import userGroups from "../../models/User/userGroups";
import { ApiError } from "../../utils/error";
import { ensureNumber, extractAllParams, wrapRequest } from "../../utils";
import Promise from "bluebird";

/**
 * Check if user in right group
 * @param {array} groupsArray
 * @returns {Function}
 */
export function rightsGroupsMiddleware (...groupsArray) {
  const { utils } = userGroups;
  const options = { public: false };
  const defaultGroups = [ 'admin' ];
  const requestedMask = utils.grouping( ...defaultGroups, ...groupsArray );

  if (groupsArray.length) {
    const lastObject = groupsArray[ groupsArray.length - 1 ];

    if (typeof lastObject === 'object' && !lastObject.mask) {
      deap.update( options, lastObject );
      groupsArray.pop();
    }
  }

  return (req, res, next) => {
    req.requestedMask = requestedMask;
    req.isPublic = options.public;

    if (options.public && !req.user) {
      return next();
    }

    const loggedInUser = req.user;

    if (!loggedInUser) {
      return next( new ApiError( 'unauthorized', 401 ) );
    } else if (!utils.hasRight( loggedInUser.accessGroup, requestedMask )) {
      return next( new ApiError( 'access_denied', 403 ) );
    }

    next();
  };
}

/**
 * Check if user has right to company
 * @returns {function(*=, *=, *=): Promise<*|undefined>}
 */
export function rightsCompanyMiddleware () {
  async function checkRights (req, res, next) {
    let {
      companyId,
      user
    } = extractAllParams( req );

    companyId = ensureNumber( companyId );

    if (!companyId) {
      return next( new ApiError( 'company.not_found', 404 ) );
    }

    const hasCompany = await user.hasCompany( companyId );

    if (!hasCompany) {
      return next( new ApiError( 'access_denied', 403 ) );
    }

    next();
  }

  return (req, res, next) => checkRights( req, res, next );
}