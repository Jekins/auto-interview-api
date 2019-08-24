import express from 'express';

import * as methods from './methods';
import { rightsGroupsMiddleware, userMiddleware } from "../middleware";

const router = express.Router();

router.post( '/', [ userMiddleware, rightsGroupsMiddleware( [ 'user' ] ) ], methods.createRequest );

export {
  router
};