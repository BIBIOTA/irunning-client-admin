import { auth } from '../libs/auth.js';

export const logoutAction = async ({ commit }) => {
  return await auth.logout().then(() => {
    commit('setLogout');
    return true;
  });
};