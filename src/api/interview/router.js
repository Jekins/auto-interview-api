import express from 'express';

import * as methods from './methods';
import { rightsCompanyMiddleware, rightsGroupsMiddleware, userMiddleware } from "../middleware";

const router = express.Router();
const route = '/:companyId/interviews/';

router.post( route, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware()
], methods.createRequest );

router.post( `${ route }:interviewId/tasks`, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware()
], methods.linkRequest );

export {
  router
};