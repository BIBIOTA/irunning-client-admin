import { request } from './axios';

export const auth = {
  baseUrl: '/auth',

  fullUrl(url) {
    return `${this.baseUrl}${url}`;
  },

  /**
   * 登入
   */
  login(data) {
    const url = '/login';
    return request(this.fullUrl(url), data, 'post')
      .then((res) => {
        if (res.status) {
          return res.data;
        }
        return res.data;
      }).catch((err) => {
        return {
          message: err,
          status: false,
        };
      });
  },
};
