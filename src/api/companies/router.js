import express from 'express';

import * as methods from './methods';
import {
  userMiddleware,
  companyMiddleware,
  rightsCompanyMiddleware,
  rightsGroupsMiddleware,
} from "../middleware";
import { router as interviewRouter } from "./interviews";
import { router as taskRouter } from "./tasks";

const router = express.Router();
const route = '/';
const routeId = `${ route }:companyId/`;

router.use( route, interviewRouter );
router.use( route, taskRouter );

// POST
router.post( route, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] )
], methods.createRequest );

router.post( `${ routeId }users`, [
  userMiddleware,
  companyMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.usersRequest );

// GET
router.get( route, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
], methods.allRequest );

router.get( routeId, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.oneRequest );

export {
  router
};