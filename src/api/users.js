import http from './http';

export async function getProfile(id) {
  return http.get('api/profile/' + id);
}
