<template>
    <div
      v-if="title"
      class="text-h5 q-pl-md q-pt-md">
        {{title}}
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Title',

  props: {
    title: String,
  },

  setup () {
    return {}
  },
  methods: {},
  created() {}
})
</script>