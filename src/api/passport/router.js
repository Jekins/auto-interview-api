import express from 'express';
import * as methods from './methods';

const router = express.Router();

router.get( '/sign-in', methods.signInRequest );
router.get( '/sign-out', methods.signOutRequest );

export {
  router
};