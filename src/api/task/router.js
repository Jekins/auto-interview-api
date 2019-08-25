import express from 'express';

import * as methods from './methods';
import { rightsCompanyMiddleware, rightsGroupsMiddleware, userMiddleware } from "../middleware";

const router = express.Router();
const route = '/:companyId/task/';

router.post( route, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware()
], methods.createRequest );

router.get( `${ route }:taskId`, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.findOneRequest );

export {
  router
};