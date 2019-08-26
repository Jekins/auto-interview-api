import express from 'express';

import * as methods from './methods';
import {
  companyMiddleware,
  rightsCompanyMiddleware,
  rightsGroupsMiddleware,
  userMiddleware
} from "../../../middleware";

const router = express.Router();
const routeSingle = '/:companyId/task/';
const routeMany = '/:companyId/tasks/';
const routeId = `${ routeSingle }:taskId/`;

router.post( routeSingle, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware()
], methods.createRequest );

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