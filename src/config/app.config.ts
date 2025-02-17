import envConfig from './env.config';

const ENV = envConfig;

export const APP_CONFIG = {
  ENV: ENV,
  IS_PRODUCTION: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
  IS_DEVELOP: process.env.NEXT_PUBLIC_NODE_ENV === 'develop',
  IS_STAGING: process.env.NEXT_PUBLIC_NODE_ENV === 'staging',
  IS_TESTING: process.env.NEXT_PUBLIC_NODE_ENV === 'test',
  IS_LOCAL: process.env.NEXT_PUBLIC_NODE_ENV === 'local',
};
