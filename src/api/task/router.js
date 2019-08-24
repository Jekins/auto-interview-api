import express from 'express';

import * as methods from './methods';
import { rightsCompanyMiddleware, rightsGroupsMiddleware, userMiddleware } from "../middleware";

const router = express.Router();
const route = '/:companyId/tasks/';

router.post( route, [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware()
], methods.createRequest );

export {
  router
};