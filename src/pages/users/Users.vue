<template>
  <q-page>
    <Title />
    <List
      :initialGetApi="getApi"
      :initialColumns="columns"
      :initialRows="rows" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Title from 'src/components/Title.vue';
import List from 'src/components/List.vue';

export default defineComponent({
  name: 'Users',

  components: {
    Title,
    List,
  },

  setup () {
    return {
      columns: [
        {
          name: 'name',
          label: '使用者名稱',
        },
        {
          name: 'isActive',
          label: '啟用狀態',
        },
        {
          name: 'edit',
          label: '編輯',
        },
      ],
      rows: ref([
        {
          name: '測試人',
          isActive: true,
          edit: {
            remove: true,
            edit: true,
            uuid: '1',
          },
        },
        {
          name: '測試人2',
          isActive: false,
          edit: {
            remove: true,
            edit: true,
            uuid: '1',
          },
        },
      ]),
      getApi: ref(true),
    }
  },
  methods: {},
  created() {}
})
</script>
