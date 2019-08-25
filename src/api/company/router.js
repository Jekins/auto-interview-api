import express from 'express';

import * as methods from './methods';
import { rightsGroupsMiddleware, rightsCompanyMiddleware, userMiddleware, companyMiddleware } from "../middleware";
import { router as interviewRouter } from "../interview";
import { router as taskRouter } from "../task";

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
], methods.addUsersRequest );

router.get( '/:companyId', [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.findOneRequest );

router.get( '/:companyId/interviews', [
  userMiddleware,
  companyMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.interviewsRequest );

router.get( '/:companyId/tasks', [
  userMiddleware,
  companyMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.tasksRequest );

export {
  router
};