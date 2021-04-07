import http from './http';

export async function getNotifyById(id) {
  return http.get('api/notification/' + id);
}
export async function countNotifyById(id) {
  return http.get('api/notification/count/' + id);
}
export async function addNotification(data) {
  return http.post('api/notification/create', data);
}
