<template>
    <div
      v-if="this.$route.meta.title"
      class="text-h5 q-pl-md q-pt-md">
        {{this.$route.meta.title}}
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Title',

  setup () {
    return {}
  },
  methods: {},
  created() {}
})
</script>