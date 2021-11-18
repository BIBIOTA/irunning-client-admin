<template>
  <q-page>
    <Title />
    <List v-model:initialRows="rows" />
    <Btns />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Title from 'src/components/Title.vue';
import List from 'src/components/List.vue';
import Btns from 'src/components/Btns.vue';

export default defineComponent({
  name: 'MembersView',

  components: {
    Title,
    List,
    Btns,
  },

  setup () {
    return {
      rows: ref([
        {
          title: '名稱',
          name: '測試人',
        },
        {
          title: '登入來源',
          loginFrom: 'Strava',
        },
        {
          title: '累積里程',
          totalDistance: '1024公里',
        },
        {
          title: '本月里程',
          monthDistance: '22公里',
        },
        {
          title: '跑者類型',
          runnerType: '初階跑者',
        },
        {
          title: '前次登入時間',
          lastLoginAt: '2021-11-01 21:22:22',
        },
      ]),
    }
  },
  methods: {},
  created() {}
})
</script>
