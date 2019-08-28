import { Op } from "sequelize";

import groupsUtils from "../../utils/groups-utils";
import { ApiError } from "../../utils/error";
import * as models from '../../models';

/**
 *
 * @param {array} groupsArray
 * @returns {Function}
 */
export function userRightsMiddleware (groupsArray = []) {
  const { groups, utils } = groupsUtils;
  const defaultGroups = [ groups.admin.name ];
  const requestedMask = utils.grouping( ...defaultGroups, ...groupsArray );

  return async (req, res, next) => {
    const userRights = await models.UserRight.findOne( {
      where: {
        [ Op.and ]: {
          userId: req.user.id,
          companyId: req.company.id,
        }
      }
    } );
    let hasRights;

    req.user.accessGroup = userRights
      ? userRights.accessGroup
      : 0;

    if (userRights && userRights.accessGroup) {
      hasRights = utils.hasRight( userRights.accessGroup, requestedMask );
    }

    if (!hasRights) {
      return next( new ApiError( 'access_denied', 403 ) );
    }

    next();
  };
}