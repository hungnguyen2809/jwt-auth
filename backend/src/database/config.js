import { config } from 'dotenv';
import mongoose from 'mongoose';
import { logger } from '../services';

config();
const URI_MONGO = process.env.URI_MONGO;

/** CONNECT MONGODB */
export const connectMongoDB = () => {
  if (!URI_MONGO) {
    logger.warn('URI Mongo is undefined');
    return;
  }
  return mongoose.connect(URI_MONGO, (error) => {
    if (error) {
      logger.error('Connecting to Mongo has error: ', error);
    } else {
      logger.log('Connected Mongo successfully');
    }
  });
};
