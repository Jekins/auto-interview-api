import express from 'express';

import * as methods from './methods';
import {
  companyMiddleware,
  rightsCompanyMiddleware,
  rightsGroupsMiddleware,
  userMiddleware
} from "../../middleware";

const router = express.Router();
const route = '/:companyId/tasks/';
const routeId = `${ route }:taskId/`;

router.post( route, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware()
], methods.createRequest );

router.get( route, [
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