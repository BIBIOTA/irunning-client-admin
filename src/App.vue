<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import { auth } from './libs/auth.js';
import { notify } from 'src/const/notify.js';

export default defineComponent({
  name: 'App',
  methods: {
    ...mapActions([
      'logoutAction',
    ]),
  },
  computed: {
    ...mapState([
      'token',
    ]),
  },
  async created() {
    if (this.token) {
      auth.me().then((res) => {
        if (!res.status) {
          notify('token失效，請重新登入', false);
          this.logoutAction().then(() => {
            this.$router.push('/');
          })
        }
      });
    }
  },
})
</script>
