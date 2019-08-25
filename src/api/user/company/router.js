import express from 'express';

import * as methods from './methods';
import * as methodsInterview from './interview/methods';
import * as methodsTask from './task/methods';
import { rightsGroupsMiddleware, rightsCompanyMiddleware, userMiddleware, companyMiddleware } from "../../middleware";
import { router as interviewRouter } from "./interview";
import { router as taskRouter } from "./task";

const router = express.Router();

router.use( '/', interviewRouter );
router.use( '/', taskRouter );

router.post( '/', [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] )
], methods.createRequest );

router.post( '/:companyId/users', [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.usersRequest );

router.get( '/:companyId', [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.oneRequest );

router.get( '/:companyId/interviews', [
  userMiddleware,
  companyMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methodsInterview.allRequest );

router.get( '/:companyId/tasks', [
  userMiddleware,
  companyMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methodsTask.allRequest );

export {
  router
};