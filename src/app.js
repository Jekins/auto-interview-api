/**
 * Setting up a global http error for handle API errors
 */
import { ApiError } from "./utils/error/api-error";

global.HttpError = ApiError;

import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { clientError, serverError } from "./utils/error/middleware";
import { router as apiRouter } from "./api";
import { config } from "./config/config";

const app = express();

app.use( morgan( 'tiny' ) );
app.use( cookieParser( config.cookieSecret ) );
app.use( session( {
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true
} ) );
app.enable( 'trust proxy' );

app.get( '/', (req, res) => res.end() );
app.use( '/api', apiRouter );

app.use( clientError );
app.use( serverError );

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  const error = new ApiError( 'endpoint_not_found', 404 );
  res.status( error.httpCode ).json( {
    error: error.plainError
  } );
  next( error );
} );

// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
  app.use( (err, req, res, next) => {
    res.status( err.status || 500 );
    console.error( err );
    res.end();
  } );
}

// production error handler
// no stacktraces leaked to addUsers
app.use( (err, req, res, next) => {
  res.status( err.status || 500 );
  res.end();
} );

export default app;