import http from './http';

export async function userProfile(id) {
  return http.get('api/profile/' + id);
}

export async function userChangeAvatar(id, data) {
  return http.put('api/user/updateImage/' + id, data);
}
export async function addChatApi(data) {
  return http.post('api/message/create/', data);
}
export async function getListChat(id) {
  return http.get('api/message/by/' + id);
}
