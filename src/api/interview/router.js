import express from 'express';
import * as methods from './methods';

const router = express.Router();

router.post( '/create', methods.createRequest );

export {
  router
};