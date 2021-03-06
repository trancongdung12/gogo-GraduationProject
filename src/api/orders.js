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

export async function getPriceApi(data) {
  return http.post('api/get-price', data);
}

export async function getBillTruckerApi(id) {
  return http.get('api/bill/trucker/' + id);
}

export async function addSearchHistoryApi(data) {
  return http.post('api/search-history/create', data);
}

export async function addLocationApi(data) {
  return http.post('api/bill/location', data);
}

export async function checkCoupon(code) {
  return http.get('api/promotion/by/' + code);
}
