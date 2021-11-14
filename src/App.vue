<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';
import { mapState, mapMutations } from 'vuex';
import { auth } from './libs/auth.js';
import { notify } from 'src/const/notify.js';

export default defineComponent({
  name: 'App',
  methods: {
     ...mapMutations([
      'setLogout',
    ]),
  },
  computed: {
    ...mapState([
      'token',
    ]),
  },
  created() {
    if (this.token) {
      auth.me().then((res) => {
        if (!res.status) {
          notify('token失效，請重新登入', false);
          this.setLogout();
          this.$router.push('/');
        }
      });
    } else {
      this.$router.push('/');
    }
  },
})
</script>
