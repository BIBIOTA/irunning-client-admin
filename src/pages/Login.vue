<template>
  <q-page class="flex flex-center" style="min-height: 550px">
    <q-form ref="loginForm" class="q-pa-md">
      <div class="q-gutter-md" style="max-width: 400px; min-width: 300px">
        <q-input v-model="email" label="帳號" :rules="[val => checkMail(val)]" />
        <q-input v-model="password" label="密碼" :rules="[val => !!val || '請填寫密碼']" :type="'password'" />
      </div>
      <div class="flex flex-center q-mt-md">
        <q-btn color="primary" type="submit" label="登入" @click="login" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { auth } from '../libs/auth.js';
import { checkMail } from 'src/const/validator.js';
import { notify } from 'src/const/notify.js';
import { mapMutations } from 'vuex';

export default defineComponent({
  name: 'Login',

  setup () {
    return {
      email: ref(''),
      password: ref(''),
    }
  },
  methods: {
    ...mapMutations([
      'setToken',
    ]),
    checkMail,
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          const form = {
            email: this.email,
            password: this.password,
          }
          auth.login(form).then((res) => {
            if (res.status) {
              const { access_token, expires_in } = res;
              this.setToken({ access_token, expires_in });
              notify('登入成功', true);
              this.$router.push({
                name: 'home',
              });
            } else {
              notify('登入失敗，請確認email和密碼是否正確', false);
            }
          }).catch((err) => {
            notify('發生例外錯誤，登入失敗', false);
          });
        }
      })
    },
  },
  created() {},
})
</script>
