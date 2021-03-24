import http from './http';

export async function userProfile(id) {
  return http.get('api/profile/' + id);
}

export async function userChangeAvatar(id, data) {
  return http.put('api/user/updateImage/' + id, data);
}
