import { date } from 'quasar';
import moment from 'moment';

export const sqlDateToFrontend = (sqlDate) => {
  if (sqlDate) {
    return date.formatDate(sqlDate, 'YYYY-MM-DD HH:mm:ss')
  } else {
    return null
  }
};

/* Strava跑步移動時間轉換 */
export const timeFormat = (moving_time) => {
  let hour = moment.utc(moving_time*1000).format('HH');
  let min = moment.utc(moving_time*1000).format('mm');
  let sec = moment.utc(moving_time*1000).format('ss');
  let timeFormat = '';
  if (parseInt(hour) > 0) {
    timeFormat += `${hour}小時`;
  }
  if (parseInt(min) > 0) {
    timeFormat += `${min}分`;
  }
  if (parseInt(sec) > 0) {
    timeFormat += `${sec}秒`;
  }
  return timeFormat;
};