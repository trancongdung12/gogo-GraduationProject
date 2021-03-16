import http from './http';

export async function getProfile(id) {
  return http.get('api/profile/' + id);
}

export async function userChangePasswordApi(id, data) {
  return http.put('/api/users/' + id + '/password/change', data);
}
export async function userUpdateInfoApi(id, data) {
  return http.put('/api/users/' + id + '/updateprofile', data);
}
