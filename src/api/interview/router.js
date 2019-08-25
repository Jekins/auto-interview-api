import express from 'express';

import * as methods from './methods';
import { companyMiddleware, rightsCompanyMiddleware, rightsGroupsMiddleware, userMiddleware } from "../middleware";

const router = express.Router();
const route = '/:companyId/interview/';

router.post( route, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware()
], methods.createRequest );

router.post( `${ route }:interviewId/tasks`, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware()
], methods.addTasksRequest );

router.get( `${ route }:interviewId`, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.findOneRequest );

export {
  router
};