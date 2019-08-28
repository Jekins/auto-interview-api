import express from 'express';

import * as methods from './methods';
import { userMiddleware } from "../middleware";

const router = express.Router();
const route = '/';

// POST
router.get( route, [
  userMiddleware(),
], methods.meRequest );

export {
  router
};