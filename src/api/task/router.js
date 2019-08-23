import express from 'express';

import * as methods from './methods';
import { rightsMiddleware, userMiddleware } from "../middleware";

const router = express.Router();

router.post( '/', [ userMiddleware, rightsMiddleware( [ 'user' ] ) ], methods.createRequest );

export {
  router
};