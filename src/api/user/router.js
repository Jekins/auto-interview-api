import express from 'express';

import * as methods from './methods';
import { rightsGroupsMiddleware, userMiddleware,  } from "../middleware";

const router = express.Router();

router.get( '/', [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] )
], methods.meRequest );


router.get( '/companies', [
  userMiddleware,
  rightsGroupsMiddleware( [ 'user' ] ),
], methods.companiesRequest );

export {
  router
};