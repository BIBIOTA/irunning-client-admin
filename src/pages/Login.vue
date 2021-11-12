<template>
  <q-page class="flex flex-center" style="min-height: 500px">
    <q-form ref="loginForm" class="q-pa-md">
      <div class="q-gutter-md" style="max-width: 400px; min-width: 300px">
        <q-input v-model="user" label="帳號" :rules="[val => username(val)]" />
        <q-input v-model="pwd" label="密碼" :rules="[val => !!val || '請填寫密碼']" :type="'password'" />
      </div>
      <div class="flex flex-center q-mt-md">
        <q-btn color="primary" type="submit" label="登入" @click="login" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { username } from 'src/const/validator.js';

export default defineComponent({
  name: 'Login',

  setup () {
  
    return {
      user: ref(''),
      pwd: ref(''),
    }
  },
  methods: {
    username,
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          const form = {
            user: this.user,
            pwd: this.pwd,
          }
          console.log(form);
          alert(true);
        }
        else {
          alert(false);
        }
      })
    },
  },
})
</script>
