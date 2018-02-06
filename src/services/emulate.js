import { stringify } from 'qs';
import request from '../utils/request';

/** 拓扑结构 */
export function fetchTopology() {
  return request(`${global.API_PREFIX}/api/topology/tree_all`);
}

/** 负荷数据 */
export function fetchLoadHistory(params) {
  return request(`${global.API_PREFIX}/api/load_history?${stringify(params)}`);
}
