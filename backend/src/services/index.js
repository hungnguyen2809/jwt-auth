export const EntityResponse = {
  sucess: (data = {}, message = 'OK', status = 200) => {
    return { error: false, status, message, data };
  },
  error: (message = 'OK', status = 200, data = null) => {
    logger.error(message);
    return { error: true, status, message, data };
  },
};

export const logger = {
  log: (message) => {
    console.log(`INFO: ${JSON.stringify(message)}`);
  },
  error: (message) => {
    console.log(`ERROR: ${JSON.stringify(message)}`);
  },
  warn: (message) => {
    console.log(`WARN: ${JSON.stringify(message)}`);
  },
};
