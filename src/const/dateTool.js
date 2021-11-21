import { date } from 'quasar'

export const sqlDateToFrontend = (sqlDate) => {
  if (sqlDate) {
    return date.formatDate(sqlDate, 'YYYY-MM-DD HH:mm:ss')
  } else {
    return null
  }
};
