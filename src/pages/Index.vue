<template>
  <q-page>
    123333
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Index',

  setup () {
    return {}
  },
  methods: {
  },
  created() {
    console.log(this.$route);
  }
})
</script>
