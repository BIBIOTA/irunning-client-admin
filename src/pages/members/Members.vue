<template>
  <q-page>
    <Title />
    <Search v-model:initialSearchForm="searchForm" />
    <List :initialColumns="columns" v-model:initialRows="rows" />
    <Pagination v-model:initialPagination="pagination" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Title from 'src/components/Title.vue';
import List from 'src/components/List.vue';
import Search from 'src/components/Search.vue';
import Pagination from 'src/components/Pagination.vue';

export default defineComponent({
  name: 'Members',

  components: {
    Title,
    List,
    Search,
    Pagination,
  },

  setup () {
    return {
      searchForm: ref([
        {
          name: 'name',
          value: '',
          type: 'input',
        },
        {
          name: 'searchBtn',
          type: 'btn',
        }
      ]),
      columns: [
        {
          name: 'name',
          label: '會員名稱',
        },
        {
          name: 'loginFrom',
          label: '登入來源',
        },
        {
          name: 'totalDistance',
          label: '累積里程',
        },
        {
          name: 'monthDistance',
          label: '本月里程',
        },
        {
          name: 'runnerType',
          label: '跑者類型',
        },
        {
          name: 'lastLoginAt',
          label: '前次登入時間',
        },
        {
          name: 'edit',
          label: '編輯',
        },
      ],
      rows: ref([
        {
          name: '測試人',
          loginFrom: 'Strava',
          totalDistance: '1023公里',
          monthDistance: '20公里',
          runnerType: '初階跑者',
          lastLoginAt: '2021-11-01 21:22:22',
          edit: {
            remove: true,
            view: true,
            uuid: '1',
          },
        },
        {
          name: '測試人2',
          loginFrom: 'Strava',
          totalDistance: '1024公里',
          monthDistance: '22公里',
          runnerType: '初階跑者',
          lastLoginAt: '2021-11-01 21:22:22',
          edit: {
            remove: true,
            view: true,
            uuid: '2',
          },
        },
      ]),
      pagination: {
        current: 2,
        max: 20,
      },
    }
  },
  methods: {},
  created() {}
})
</script>
