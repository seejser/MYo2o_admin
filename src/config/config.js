import DevConfig from './config.dev.js';
import ProConfig from './config.pro.js';

const BaseConfig = process.env.NODE_ENV == 'development' ? DevConfig : ProConfig;

export default BaseConfig;
