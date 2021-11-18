<template>
  <div class="q-pa-md flex flex-center q-gutter-sm">
    <q-btn color="primary" label="返回" @click="() => $router.back()" />
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Btns',

  props: {
    back: Boolean,
  },

  data() {
    return {}
  },

  methods: {},
  created() {}
})
</script>