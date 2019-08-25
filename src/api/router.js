import express from 'express';
import bodyParser from 'body-parser';

import cors from './cors';
import { router as passportRouter } from "./passport";
import { router as companyRouter } from "./company";
import { router as userRouter } from "./user";

const router = express.Router();

router.use( bodyParser.json() );
router.use( bodyParser.urlencoded( { extended: false } ) );

router.all( '*', cors );

router.use( '/passport', passportRouter );
router.use( '/company', companyRouter );
router.use( '/user', userRouter );

export {
  router
};