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
      @update="onUpdate"
      @delete="onDelete"
      :initialGetApi="computedGetApi"
      :initialColumns="columns"
      :initialRows="computedRow" />
    <Pagination
      :initialPagination="{
        current: variables.page,
        max: result?.newsAll?.paginatorInfo?.lastPage ?? pageMax,
      }"
      @changePage="getData"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from 'graphql-tag';
import Title from 'src/components/Title.vue';
import List from 'src/components/List.vue';
import Pagination from 'src/components/Pagination.vue';


const newsAllGql = gql`query newsAll (
    $page: Int
  ) {
    newsAll(page: $page) {
      paginatorInfo {
        total
        perPage
        currentPage
        lastPage
      }
      data {
        id
        title
        content
        isActive
        created_at
        updated_at
      }
    }
  }`;

const updateNewsGql = gql`mutation updateNews(
  $id: ID!
  $title: String!
  $isActive: Boolean!
) {
  updateNews(
    id: $id
    title: $title
    isActive: $isActive
  ) {
    id
    title
    content
    isActive
    created_at
    updated_at
  }
}`;

const deleteNewsGql = gql`mutation deleteNews(
  $id: ID!
) {
  deleteNews(
    id: $id
  ) {
    id
  }
}`;

export default defineComponent({
  name: 'News',

  components: {
    Title,
    List,
    Pagination,
  },

  setup () {

    const variables = ref({
      page: 1,
    });

    const pageMax = 1;

    const { result, refetch } = useQuery(newsAllGql, variables);

    const { mutate: updateNews } = useMutation(updateNewsGql);

    const { mutate: deleteNews } = useMutation(deleteNewsGql);

    return {
      updateNews,
      deleteNews,
      variables,
      pageMax,
      refetch,
      result,
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
    }
  },
  methods: {
    getData(page) {
      this.pageMax = this.result.newsAll.paginatorInfo.lastPage;
      this.variables.page = page;
      this.refetch();
    },
    onUpdate(item) {
      this.updateNews({
        id: item.id,
        title: item.title,
        isActive: item.isActive,
      }).then((res) => {
        this.refetch();
      }).catch((err) => {
        this.refetch();
        console.log(err);
      });
    },
    onDelete(id) {
      this.deleteNews({ id }).then((res) => {
        this.refetch();
      }).catch((err) => {
        console.log(err);
      });
    },
  },
  computed: {
    computedGetApi() {
      if (this.result?.newsAll?.data?.length > 0) {
        return true;
      }
      return false;
    },
    computedRow()
    {
      if (this.result?.newsAll?.data?.length > 0) {
        const data = this.result.newsAll.data.map((row) => {
          return {
            id: row.id,
            title: row.title,
            contentHtml: row.content,
            isActive: row.isActive,
            edit: {
              remove: true,
              edit: true,
              id: row.id,
            },
          };
        });
        return data;
      }
      return [];
    }
  }
});
</script>
