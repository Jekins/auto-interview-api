import express from 'express';

import * as methods from './methods';
import { rightsGroupsMiddleware, userMiddleware, } from "../middleware";

const router = express.Router();
const route = '/';

// POST
router.get( route, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] )
], methods.meRequest );

export {
  router
};