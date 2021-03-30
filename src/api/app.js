import http from './http';

export async function getListTruckApi() {
  return http.get('api/truck/list');
}
