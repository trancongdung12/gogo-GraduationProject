import http from './http';

export async function userOrderApi(data) {
  return http.post('api/order/create', data);
}
export async function getUserOrderByIdApi(id) {
  return http.get('api/order/by/' + id);
}
export async function getListOrderApi() {
  return http.get('api/order/list');
}
export async function updateOrderStatusApi(id, status) {
  return http.put('api/order/updateStatus/' + id, status);
}
