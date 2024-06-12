/* import * as path from 'path';
import * as dotenv from 'dotenv';
const ROOT = path.normalize(__dirname + '/../..');
dotenv.config({ path: `${ROOT}/.env` }); */

const envConfig = {
  NODE_ENV: process.env.NODE_ENVIROMENT || 'local',
  VERSION: process.env.VERSION || 'v1',
  BASE_URL_BACK_END: process.env.NEXT_PUBLIC_BASE_URL_BACK_END || 'https://api.lathdev.site',
  KEY_ACCESS_TOKEN: process.env.NEXT_PUBLIC_KEY_ACCESS_TOKEN || `accessToken`,
};

export default envConfig;
