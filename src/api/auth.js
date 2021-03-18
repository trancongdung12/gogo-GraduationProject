import http from './http';

export async function userRegisterApi(data) {
  return http.post('api/register', data);
}
export async function userLoginApi(data) {
  return http.post('api/login', data);
}
