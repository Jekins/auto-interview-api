import express from 'express';

import * as methods from './methods';
import { rightsGroupsMiddleware, rightsCompanyMiddleware, userMiddleware } from "../middleware";

const router = express.Router();

router.post( '/', [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] )
], methods.createRequest );

router.post( '/:companyId/users', [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.linkRequest );

export {
  router
};