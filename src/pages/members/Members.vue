<template>
  <q-page>
    <Title />
    <Search
      :initialSearchForm="searchForm"
      @search="search"
    />
    <List :initialGetApi="getApi" :initialColumns="columns" :initialRows="rows" />
    <Pagination :initialPagination="pagination" @changePage="search" />
  </q-page>
</template>

<script>
import _ from 'lodash';
import { defineComponent, reactive, ref } from 'vue';
import Title from 'src/components/Title.vue';
import List from 'src/components/List.vue';
import Search from 'src/components/Search.vue';
import Pagination from 'src/components/Pagination.vue';
import { sqlDateToFrontend } from 'src/const/dateTool.js';
import { notify } from 'src/const/notify.js';
import { members } from 'src/libs/members.js';

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
      searchForm: reactive([
        {
          name: 'username',
          label: '搜尋會員(會員名稱)',
          value: '',
          type: 'input',
        },
        {
          name: 'searchBtn',
          type: 'btn',
        }
      ]),
      columns: reactive([
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
          label: '檢視',
        },
      ]),
      rows: reactive([]),
      pagination: reactive({
        current: 1,
        max: 1,
      }),
      getApi: ref(false),
    }
  },
  methods: {
    getQueryToData() {
      const { page, ...query } = this.$route.query;
      if (page) {
        this.pagination.current = parseInt(page);
      }
      Object.keys(query).forEach((key) => {
        this.searchForm.forEach((item) => {
          if (item.name === key) {
            item.value = query[key];
          }
        });
      });
    },
    search(page = this.pagination.current) {
      const formData = {};
      _.set(formData, 'page', page);
      Object.keys(this.searchForm).forEach((key) => {
        if (this.searchForm[key].value) {
          _.set(formData, this.searchForm[key].name, this.searchForm[key].value);
        }
      });
      this.$router.push({
        query: formData,
      });
      this.getData(formData);
    },
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
  created() {
    this.getQueryToData();
  },
  mounted () {
    const searchForm = this.$route.query;
    this.getData(searchForm);
  },
})
</script>
