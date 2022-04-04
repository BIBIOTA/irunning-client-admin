<template>
  <q-page>
    <div class="flex items-center">
      <Title />
      <q-space></q-space>
      <q-btn
        color="primary"
        label="新增"
        class="q-mt-md q-mx-md"
        @click="$router.push('/news/create')"
      />
    </div>
    <List
      :initialGetApi="getApi"
      :initialColumns="columns"
      :initialRows="rows" />
    <Pagination
      :initialPagination="pagination"
      @changePage="getData({ page: 1 })"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import Title from 'src/components/Title.vue';
import List from 'src/components/List.vue';
import Pagination from 'src/components/Pagination.vue';

export default defineComponent({
  name: 'News',

  components: {
    Title,
    List,
    Pagination,
  },

  setup () {
    return {
      columns: [
        {
          name: 'title',
          label: '標題',
        },
        {
          name: 'content',
          label: '內容',
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
          name: '貓咪大戰爭!',
          content: '測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容測試內容',
          isActive: true,
          edit: {
            remove: true,
            edit: true,
            uuid: '1',
          },
        },
        {
          name: '咒術迴戰',
          content: '領域展開領域展開領域展開領域展開領域展開領域展開領域展開領域展開領域展開領域展開領域展開領域展開領域展開領域展開領域展開領域展開領域展開領域展開領域展開領域展開領域展開領域展開領域展開',
          isActive: true,
          edit: {
            remove: true,
            edit: true,
            uuid: '1',
          },
        },
      ]),
      getApi: ref(true),
      pagination: reactive({
        current: 1,
        max: 1,
      }),
    }
  },
  methods: {
    getData(formData = null) {
      this.getApi = false;
      this.rows = [];
      members.index(formData).then((res) => {
        if (res.status) {
          this.pagination = {
            current: res.data?.current_page,
            max: res.data?.last_page,
          }
          if (res.data?.data?.length > 0) {
            const data = res.data.data.map((row) => {
              return {
                username: row.username,
                loginFrom: row.loginFrom,
                totalDistance: row.totalDistance,
                monthDistance: row.monthDistance,
                runnerType: row.runnerType,
                lastLoginAt: sqlDateToFrontend(row.lastLoginAt),
                edit: {
                  view: true,
                  uuid: row.id,
                },
              };
            });
            this.rows = data;
            this.getApi = true;
          }
        } else {
          notify(res.message, false);
          this.getApi = true;
        }
      });
    },
  },
  created() {}
})
</script>
