import express from 'express';

import * as methods from './methods';
import {
  userMiddleware,
  companyMiddleware,
  userRightsMiddleware,
} from "../../middleware";
import { groups } from "../../../utils";

const router = express.Router();
const route = '/:companyId/setTasks/';
const routeId = `${ route }:taskId/`;

// POST
router.post( route, [
  userMiddleware(),
  companyMiddleware(),
  userRightsMiddleware( [ groups.user ] )
], methods.createRequest );

// GET
router.get( route, [
  userMiddleware(),
  companyMiddleware(),
  userRightsMiddleware( [ groups.user ] ),
], methods.allRequest );

router.get( routeId, [
  userMiddleware(),
  companyMiddleware(),
  userRightsMiddleware( [ groups.user ] ),
], methods.oneRequest );

// DELETE
router.delete( routeId, [
  userMiddleware(),
  companyMiddleware(),
  userRightsMiddleware( [ groups.user ] )
], methods.removeRequest );

export {
  router
};