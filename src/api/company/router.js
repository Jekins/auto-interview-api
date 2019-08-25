import express from 'express';

import * as methods from './methods';
import { rightsGroupsMiddleware, rightsCompanyMiddleware, userMiddleware, companyMiddleware } from "../middleware";
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

router.get( '/', [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
], methods.getAllRequest );

router.get( '/:companyId', [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
  rightsCompanyMiddleware(),
], methods.getOneByIdRequest );

export {
  router
};