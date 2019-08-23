import express from 'express';
import bodyParser from 'body-parser';
import cors from './cors';
import { router as passportRouter } from "./passport";
import { router as interviewRouter } from "./interview";
import { router as taskRouter } from "./task";

const router = express.Router();

router.use( bodyParser.json() );
router.use( bodyParser.urlencoded( { extended: false } ) );

router.all( '*', cors );

router.use( '/passport', passportRouter );
router.use( '/interviews', interviewRouter );
router.use( '/tasks', taskRouter );

export {
  router
};