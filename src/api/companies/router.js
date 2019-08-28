import express from 'express';

import * as methods from './methods';
import {
  userMiddleware,
  companyMiddleware,
  userRightsMiddleware,
} from "../middleware";
import { router as interviewRouter } from "./interviews";
import { router as taskRouter } from "./tasks";
import { groups } from "../../utils";

const router = express.Router();
const route = '/';
const routeId = `${ route }:companyId/`;

router.use( route, interviewRouter );
router.use( route, taskRouter );

// POST
router.post( route, [
  userMiddleware()
], methods.createRequest );

router.post( `${ routeId }users`, [
  userMiddleware(),
  companyMiddleware(),
  userRightsMiddleware()
], methods.addUsersRequest );

// GET
router.get( route, [
  userMiddleware()
], methods.allRequest );

router.get( routeId, [
  userMiddleware(),
  companyMiddleware(),
  userRightsMiddleware( [ groups.user ] )
], methods.oneRequest );

// DELETE
router.delete( routeId, [
  userMiddleware(),
  companyMiddleware(),
  userRightsMiddleware()
], methods.removeRequest );

router.delete( `${ routeId }users`, [
  userMiddleware(),
  companyMiddleware(),
  userRightsMiddleware()
], methods.removeUsersRequest );

export {
  router
};