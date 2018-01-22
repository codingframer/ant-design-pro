import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function accountLogin(params) { // 用户登录
  return request(`${global.API_PREFIX}/mobile/login`, {
    method: 'POST',
    body: params,
  });
}
