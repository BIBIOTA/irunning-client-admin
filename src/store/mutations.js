import { Cookies } from 'quasar'
import { date } from 'quasar'

export function setToken (state, data) {
  const { access_token, expires_in } = data;
  const newDate = new Date();
  const expires = date.addToDate(newDate, { seconds: expires_in })
  Cookies.set('token', access_token, { expires })
  state.token = access_token;
}

export function setLogout (state) {
  Cookies.remove('token');
  state.token = null;
}
