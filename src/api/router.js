import express from 'express';
import bodyParser from 'body-parser';
import cors from './cors';
import { router as passportRouter } from "./passport";
// import { router as testRouter } from "./test";

const router = express.Router();

router.use( bodyParser.json() );
router.use( bodyParser.urlencoded( { extended: false } ) );

router.all( '*', cors );

router.use( '/passport', passportRouter );
// router.use( '/test', testRouter );

export {
  router
};