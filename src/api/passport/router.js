import express from 'express';
import * as methods from './methods';

const router = express.Router();
const route = '/';

// POST
router.post( `${ route }sign-in`, methods.signInRequest );
router.post( `${ route }sign-up`, methods.signUpRequest );
router.post( `${ route }sign-out`, methods.signOutRequest );

export {
  router
};