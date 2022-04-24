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
    return request(this.baseUrl, data)
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

  /**
   * view
   */
   view(memberId) {
    const url = `/${memberId}`;
    return request(this.fullUrl(url))
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

  /**
   * runningInfo
   */
   runningInfo(memberId, runningId) {
    const url = `/${memberId}/${runningId}`;
    return request(this.fullUrl(url))
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
