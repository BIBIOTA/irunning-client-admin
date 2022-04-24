<template>
  <q-page>
    <div class="flex items-center">
      <Title />
      <q-space></q-space>
      <q-btn
        color="primary"
        label="新增"
        class="q-mt-md q-mx-md"
        @click="$router.push('/banner/create')"
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
        max: result?.bannerAll?.paginatorInfo?.lastPage ?? pageMax,
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

const bannerAllGql = gql`query bannerAll (
    $page: Int
  ) {
    bannerAll(page: $page) {
      paginatorInfo {
        total
        perPage
        currentPage
        lastPage
      }
      data {
        id
        title
        image
        isIncludeLink
        link
        isActive
        created_at
        updated_at
      }
    }
  }`;

const switchBannerGql = gql`mutation switchBanner(
  $id: ID!
  $isActive: Boolean!
) {
  switchBanner(
    id: $id
    isActive: $isActive
  ) {
      id
      title
      image
      isIncludeLink
      link
      isActive
      created_at
      updated_at
  }
}`;

const deleteBannerGql = gql`mutation deleteBanner(
  $id: ID!
) {
  deleteBanner(
    id: $id
  ) {
    id
  }
}`;

export default defineComponent({
  name: 'Banner',

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

    const { result, refetch } = useQuery(bannerAllGql, variables);

    const { mutate: switchBanner } = useMutation(switchBannerGql);

    const { mutate: deleteBanner } = useMutation(deleteBannerGql);

    return {
      switchBanner,
      deleteBanner,
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
          name: 'image',
          label: '圖片',
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
      this.pageMax = this.result.bannerAll.paginatorInfo.lastPage;
      this.variables.page = page;
      this.refetch();
    },
    onUpdate(item) {
      this.switchBanner({
        id: item.id,
        isActive: item.isActive,
      }).then((res) => {
        this.refetch();
      }).catch((err) => {
        this.refetch();
        console.log(err);
      });
    },
    onDelete(id) {
      this.deleteBanner({ id }).then((res) => {
        this.refetch();
      }).catch((err) => {
        console.log(err);
      });
    },
  },
  computed: {
    computedGetApi() {
      if (this.result?.bannerAll?.data?.length > 0) {
        return true;
      }
      return false;
    },
    computedRow()
    {
      if (this.result?.bannerAll?.data?.length > 0) {
        const data = this.result.bannerAll.data.map((row) => {
          return {
            id: row.id,
            title: row.title,
            image: process.env.STORAGE_URL + '/image/' + row.image,
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
