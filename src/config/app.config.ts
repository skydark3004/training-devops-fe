import envConfig from './env.config';

const ENV = envConfig;

export const APP_CONFIG = {
  ENV: ENV,
  IS_PRODUCTION: process.env.NEXT_PUBLIC_NODE_ENVIROMENT === 'production',
  IS_DEVELOP: process.env.NEXT_PUBLIC_NODE_ENVIROMENT === 'develop',
  IS_STAGING: process.env.NEXT_PUBLIC_NODE_ENVIROMENT === 'staging',
  IS_TESTING: process.env.NEXT_PUBLIC_NODE_ENVIROMENT === 'test',
  IS_LOCAL: process.env.NEXT_PUBLIC_NODE_ENVIROMENT === 'local',
};
