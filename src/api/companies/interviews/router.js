import express from 'express';

import * as methods from './methods';
import {
  userMiddleware,
  companyMiddleware,
  rightsCompanyMiddleware,
  rightsGroupsMiddleware,
} from "../../middleware";

const router = express.Router();
const route = '/:companyId/interviews/';
const routeId = `${ route }:interviewId/`;

// POST
router.post( route, [
  userMiddleware,
  companyMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware()
], methods.createRequest );

router.post( `${ routeId }tasks`, [
  userMiddleware,
  companyMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware()
], methods.tasksRequest );

// GET
router.get( route, [
  userMiddleware,
  companyMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.allRequest );

router.get( routeId, [
  userMiddleware,
  companyMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.oneRequest );

export {
  router
};