import express from 'express';

import * as methods from './methods';
import { rightsGroupsMiddleware, rightsCompanyMiddleware, userMiddleware } from "../middleware";
import { router as interviewRouter } from "../interview";
import { router as taskRouter } from "../task";

const router = express.Router();

router.use( '/', interviewRouter );
router.use( '/', taskRouter );

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