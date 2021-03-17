import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import { data } from '../data';
const API_ROOT = 'https://api-gogo.herokuapp.com/';

axios.defaults.baseURL = API_ROOT;
axios.defaults.timeout = 15000;

axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  (error) => handleError(error),
);

const handleError = (error) => {
  let dataCode = 'not_response';
  if (error.response) {
    const { code, message, data, status } = error.response;
    if (status === 401) {
      // dispatch logout
      // store.dispatch(logout());
    }
  }
  return Promise.reject(error.response || error.request || error.message);
};

function getHeaderAndContentType(extension) {
  let mimeType;
  if (extension.includes('jpg') || extension.includes('jpeg')) {
    mimeType = 'image/jpeg';
  }
  if (extension.includes('png')) {
    mimeType = 'image/png';
  }
  return mimeType;
}
export const imageUpload = async (data, token) => {
  try {
    let extension = 'png';
    if (data.path) {
      extension = data.path.split('.').pop();
    } else {
      extension = data.uri.split('.').pop();
    }
    const { url, name, mimeType } = getHeaderAndContentType(extension);

    const fileName = `${name}${Date.now()}.${extension}`;
    console.log('st 1');
    const formData = new FormData();
    formData.append('image', {
      uri: url,
      name: fileName,
      type: mimeType,
    });
    formData.append('folder', 'users');
    const upload = await fetch('http://dtravel.crayi.com/api/v1/image-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
      body: formData,
    }).then((response) =>
      response.json().then((jsonObj) => {
        return jsonObj;
      }),
    );

    let source = data.uri;
    const result = await RNFetchBlob.fetch(
      'PUT',
      upload.uploadUrl,
      {
        'Content-Type': data.type,
      },
      RNFetchBlob.wrap(source),
    );
    return { url: upload.url, uri: data.uri };
  } catch (err) {
    console.log(err);
  }
};

const http = {
  setAuthorizationHeader(accessToken) {
    // axios.defaults.headers.Authorization = `bearer ${accessToken}`;
  },

  request(config = {}) {
    return axios.request(config);
  },
  get(url, config = {}) {
    console.log(url);
    return axios.get(url, config);
  },
  post(url, data = {}, config = {}) {
    console.log(url, data);
    return axios.post(url, data, config);
  },
  put(url, data = {}, config = {}) {
    console.log(url, data);

    return axios.put(url, data, config);
  },
  patch(url, data = {}, config = {}) {
    console.log(url, data);
    return axios.patch(url, data, config);
  },
  delete(url, config = {}) {
    console.log(url);
    return axios.delete(url, config);
  },
  postUploadFile(url, data = {}) {
    let formData = new FormData();
    data.photos.forEach((photo) => {
      formData.append('photos', {
        uri: photo,
        type: 'image/jpg',
        name: `${new Date().getTime()}.jpg`,
      });
    });

    return this.post(url, formData);
  },
  uploadFile(url, data) {
    let formData = new FormData();
    const extension = data.split('.').pop();
    const mimeType = getHeaderAndContentType(extension);
    formData.append('file', {
      uri: data,
      type: mimeType,
      name: `${new Date().getTime()}.jpg`,
    });

    return this.post(url, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default http;
