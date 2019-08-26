import express from 'express';
import * as methods from './methods';

const router = express.Router();
const routeSingle = '/passport/';

router.post( `${ routeSingle }sign-in`, methods.signInRequest );
router.post( `${ routeSingle }sign-up`, methods.signUpRequest );
router.post( `${ routeSingle }sign-out`, methods.signOutRequest );

export {
  router
};