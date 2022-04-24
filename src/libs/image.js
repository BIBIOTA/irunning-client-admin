import { request } from './axios';

export const image = {
  baseUrl: '/upload',

  fullUrl(url) {
    return `${this.baseUrl}${url}`;
  },

  /**
   * uploadImage
   */
  uploadImage(data) {
    const url = '/uploadImage';
    return request(this.fullUrl(url), data, 'post')
      .then((res) => {
        if (res.status) {
          return res.data;
        }
        return res;
      }).catch((err) => {
        return {
          message: err,
          status: false,
        };
      });
  },
};
