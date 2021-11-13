import { Notify } from 'quasar';

export const notify = (message, boolean) => Notify.create({
  message,
  color: boolean ? 'primary' : 'negative',
});
