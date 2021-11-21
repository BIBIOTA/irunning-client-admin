import { request } from './axios';

export const members = {
  baseUrl: '/members',

  fullUrl(url) {
    return `${this.baseUrl}${url}`;
  },

  /**
   * index
   */
  index(data) {
    const url = '/';
    return request(this.fullUrl(url), data)
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