import deap from 'deap';
import userGroups from "../../models/User/userGroups";
import { ApiError } from "../../utils/error";

export function rightsMiddleware (...groupsArray) {
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