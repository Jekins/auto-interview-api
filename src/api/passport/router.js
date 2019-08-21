import express from 'express';
import * as methods from './methods';

const router = express.Router();

router.post( '/sign-in', methods.signInRequest );
router.post( '/sign-up', methods.signUpRequest );

export {
  router
};