import http from './http';

export async function userOrderApi(data) {
  return http.post('api/order/create', data);
}
