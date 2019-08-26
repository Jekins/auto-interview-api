import express from 'express';

import * as methods from './methods';
import { rightsGroupsMiddleware, rightsCompanyMiddleware, userMiddleware, companyMiddleware } from "../middleware";
import { router as interviewRouter } from "./interview";
import { router as taskRouter } from "./task";

const router = express.Router();
const routeSingle = '/company/';
const routeMany = '/companies/';
const routeId = `${ routeSingle }:companyId/`;

router.use( routeSingle, interviewRouter );
router.use( routeSingle, taskRouter );

router.post( routeSingle, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] )
], methods.createRequest );

router.get( routeMany, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
], methods.allRequest );

router.get( routeId, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.oneRequest );

router.post( `${ routeId }users`, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.usersRequest );

export {
  router
};