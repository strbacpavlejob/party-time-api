import { registerAs } from '@nestjs/config';

const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * Mongo database connection config
 */
export default registerAs('mongodb', () => {
  const {
    MONGO_PORT,
    MONGO_HOSTNAME,
    MONGO_DATABASE,
    MONGO_USERNAME,
    MONGO_PASSWORD,
  } = process.env;
  console.log(`isDevelopment: ${isDevelopment}`);
  console.log(`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DATABASE}`);
  return {
    uri: isDevelopment
      ? `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/?authMechanism=DEFAULT`
      : `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DATABASE}?retryWrites=true&w=majority`,
    dbName: `${MONGO_DATABASE}`,
  };
});
