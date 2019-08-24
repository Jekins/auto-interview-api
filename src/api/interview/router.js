import express from 'express';

import * as methods from './methods';
import { rightsGroupsMiddleware, userMiddleware } from "../middleware";

const router = express.Router();

router.post( '/', [ userMiddleware, rightsGroupsMiddleware( [ 'user' ] ) ], methods.createRequest );
router.post( '/:interviewId/tasks', [ userMiddleware, rightsGroupsMiddleware( [ 'user' ] ) ], methods.linkRequest );

export {
  router
};