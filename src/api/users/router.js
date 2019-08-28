import express from 'express';

import * as methods from './methods';
import { rightsGroupsMiddleware, userMiddleware, userRightsMiddleware } from "../middleware";

const router = express.Router();
const route = '/';

// POST
router.get( route, [
  userMiddleware(),
  userRightsMiddleware()
], methods.meRequest );

export {
  router
};