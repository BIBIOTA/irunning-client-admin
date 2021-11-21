<template>
  <div class="q-pa-lg flex flex-center" v-if="pagination">
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
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'Pagination',

  props: {
    initialPagination: Object,
  },

  data () {
    return {
      pagination: reactive(this.initialPagination),
    }
  },

  methods: {},

  watch: {
    initialPagination(payload) {
      this.pagination = payload;
    },
    computedPagination() {
      this.$emit('changePage');
    }
  },

  computed: {
    computedPagination() {
      return this.pagination.current;
    },
  },

  created() {}
})
</script>