import http from './http';

export async function userRegisterApi(data) {
  return http.post('api/users', data);
}
export async function userLoginApi(data) {
  return http.post('api/token', data);
}
export async function userLogoutApi() {
  return http.delete('api/token');
}

export async function bookTypesApis() {
  return http.get('api/books');
}
