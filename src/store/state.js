import { Cookies } from 'quasar'

export default function () {
  return {
    token: Cookies.get('token') ?? null,
  }
}
