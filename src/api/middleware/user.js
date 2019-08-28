import Promise from 'bluebird';
import { config } from "../../config/config";
import * as models from "../../models";
import { ApiError } from "../../utils/error";

/**
 *
 * @returns {Function}
 */
export function userMiddleware () {
  return async (req, res, next) => {
    const AUTH_COOKIE_NAME = config.auth.cookieName;
    const session = req.session || {};
    const cookies = req.cookies;
    let user;
    let { token = req.query && req.query.token || req.body && req.body.token } = req.params;

    req._ip = req.headers[ 'x-forwarded-for' ]
      || req.connection.remoteAddress
      || req.headers[ 'x-real-ip' ]
      || 'Not specified';

    token = req.header( 'X-Token' ) || token || cookies[ AUTH_COOKIE_NAME ];
    req.token = token;

    if (session && session.userId) {
      user = await models.User.findByPk( session.userId );
    } else if (typeof token === 'string') {
      user = await getUser( token );
    }

    if (!user) {
      return next( new ApiError( 'unauthorized', 401 ) );
    }

    session.userId = user.id;
    req.user = user;

    await user.update( {
      recentActivityTimeMs: Date.now()
    } );

    next();
  };
}

/**
 *
 * @param {string} token
 * @returns {Promise<null|*>}
 */
export async function getUser (token) {
  const tokenInstance = await models.AuthToken.findOne( {
    where: { token }
  } );

  if (!tokenInstance) {
    return null;
  }

  const user = await tokenInstance.getUser( {
    attributes: {
      exclude: [ 'deletedAt' ]
    }
  } );

  if (!user) {
    return null;
  }

  return user;
}
