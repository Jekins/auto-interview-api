import express from 'express';

import * as methods from './methods';
import { rightsCompanyMiddleware, rightsGroupsMiddleware, userMiddleware } from "../middleware";

const router = express.Router();

router.post( '/', [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware()
], methods.createRequest );

router.post( '/:interviewId/tasks', [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware()
], methods.linkRequest );

export {
  router
};