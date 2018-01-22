import { stringify } from 'qs';
import request from '../utils/request';


export async function queryLog(params) {
  return request(`${global.API_PREFIX}/security/log/index_json?${stringify(params)}`);
}
