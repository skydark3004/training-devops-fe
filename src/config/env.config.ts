const envConfig = {
  NODE_ENV: process.env.NODE_ENVIROMENT || 'local',
  VERSION: process.env.VERSION || 'v1',
  BASE_URL_BACK_END: process.env.NEXT_PUBLIC_BASE_URL_BACK_END || 'http://localhost:9999',
  KEY_ACCESS_TOKEN: process.env.NEXT_PUBLIC_KEY_ACCESS_TOKEN || `accessToken`,
  JWT_SECRET: process.env.NEXT_PUBLIC_KEY_JWT_SECRET || `secret-key`,
};

export default envConfig;
