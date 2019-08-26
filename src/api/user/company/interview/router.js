import express from 'express';

import * as methods from './methods';
import {
  companyMiddleware,
  rightsCompanyMiddleware,
  rightsGroupsMiddleware,
  userMiddleware
} from "../../../middleware";

const router = express.Router();
const routeSingle = '/:companyId/interview/';
const routeMany = '/:companyId/interviews/';
const routeId = `${ routeSingle }:interviewId/`;

router.post( routeSingle, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware()
], methods.createRequest );

router.post( `${ routeId }tasks`, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware()
], methods.tasksRequest );

router.get( routeMany, [
  userMiddleware,
  companyMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.allRequest );

router.get( routeId, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.oneRequest );

export {
  router
};