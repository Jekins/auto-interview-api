import dotenv from 'dotenv';
import { database as localDatabase } from "./env/local";

if (process.env.NODE_ENV !== 'development'
  && process.env.NODE_ENV !== 'test') {
  dotenv.config();
}

const env = process.env.NODE_ENV;

const databaseCredentials = localDatabase;

export const config = {
  "env": env,
  "secureProtocol": env === 'production',
  "ip": "",
  "port": process.env.PORT || 8080,
  "db": {
    ...databaseCredentials,
    "max": 100,
    "min": 1,
    "acquire": 30000,
    "idle": 10000
  },
  "cors": {
    "origins": [ "*" ],
    "methods": [ "POST", "GET", "OPTIONS" ],
    "headers": [ "Content-Type", "X-Token", "X-Requested-With" ]
  },
  "salt": "javascript-is-the-best"
};