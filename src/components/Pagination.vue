<template>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="pagination.current"
      color="black"
      :max="pagination.max"
      :max-pages="6"
      boundary-numbers
    />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Pagination',

  props: {
    initialPagination: Object,
  },

  data() {
    return {
      pagination: this.initialPagination,
    }
  },

  methods: {},
  created() {}
})
</script>