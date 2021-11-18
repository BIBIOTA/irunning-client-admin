<template>
  <div class="q-pa-md q-mt-sm">
    <div class="q-gutter-y-md row items-start">
      <div class="q-px-sm" style="min-width: 300px" v-for="col in searchForm" :key="col.name">
        <q-input v-if="col.type === 'input'" outlined v-model="col.value" label="搜尋會員(會員名稱)" dense />
        <q-btn v-if="col.type === 'btn'" color="primary" label="查詢" />
      </div>
      <q-space />
      <q-btn
        v-if="add"
        color="primary"
        label="新增"
        :to="`${$route.path}/add`"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Search',

  props: {
    initialSearchForm: Array,
    add: Boolean,
  },

  data() {
    return {
      searchForm: this.initialSearchForm,
    }
  },

  methods: {},
  created() {}
})
</script>