import express from 'express';

import * as methods from './methods';
import { rightsGroupsMiddleware, userMiddleware, } from "../middleware";

const router = express.Router();
const routeSingle = '/user/';

router.get( routeSingle, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] )
], methods.meRequest );

export {
  router
};