<template>
  <q-page>
    <Title />
    <List
      :initialGetApi="getApi"
      :initialRows="rows" />
    <CustomTitle :title="'跑步紀錄'" />
    <List
      :initialGetApi="getApi"
      :initialColumns="runningRecordsColumns"
      :initialRows="runningRecordsRows"
      @customAction="customAction"
    />
    <Btns />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Title from 'src/components/Title.vue';
import List from 'src/components/List.vue';
import CustomTitle from 'src/components/CustomTitle.vue';
import Btns from 'src/components/Btns.vue';
import { notify } from 'src/const/notify.js';
import { members } from 'src/libs/members.js';
import { sqlDateToFrontend, timeFormat } from 'src/const/dateTool.js';

export default defineComponent({
  name: 'MembersView',

  components: {
    Title,
    List,
    CustomTitle,
    Btns,
  },

  setup () {
    return {
      rows: ref([
        {
          title: '名稱',
          name: '',
        },
        {
          title: '登入來源',
          loginFrom: '',
        },
        {
          title: '累積里程',
          totalDistance: '',
        },
        {
          title: '本月里程',
          monthDistance: '',
        },
        {
          title: '跑者類型',
          runnerType: '',
        },
        {
          title: '前次登入時間',
          lastLoginAt: '',
        },
      ]),
      runningRecordsColumns: [
        {
          name: 'date',
          label: '日期',
        },
        {
          name: 'distance',
          label: '里程',
        },
        {
          name: 'time',
          label: '時間',
        },
        {
          name: 'edit',
          label: '查看',
        },
      ],
      runningRecordsRows:  ref([
        {
          date: '',
          distance: '',
          movingTime: '',
          customBtns: {
            view: true,
            uuid: '',
          },
        },
      ]),
      getApi: ref(true),
    }
  },
  methods: {
    /*
      emit回傳, 根據回傳的命名在分派給指定methods並傳值
      clickView => 點擊檢視跑步btn
    */
    customAction(actions, payload) {
      this[actions](payload);
    },
    clickView(payload) {
      this.$router.push({
        name: 'membersRunningInfo',
        params: {
          uuid: this.$route.params.uuid,
          runningUuid: payload.uuid,
        },
      });
    },
    getData(memberUuid) {
      this.getApi = false;
      members.view(memberUuid).then((res) => {
        if (res.status) {
          if (res.data?.member) {
            Object.keys(res.data.member).forEach((key) => {
              this.rows.forEach((item) => {
                if (key in item) {
                  if (key === 'lastLoginAt') {
                    item[key] = sqlDateToFrontend(res.data.member[key]); 
                  } else {
                    item[key] = res.data.member[key]; 
                  }
                }
              });
            });
          }
          if (res.data?.activities && res.data?.activities.length > 0) {
            const activities = res.data.activities.map((item) => {
              return {
                date: item.time,
                distance: `${item.distance} 公里`,
                movingTime: timeFormat(item.movingTime),
                customBtns: {
                  view: true,
                  uuid: item.id,
                },
              };
            });
            this.runningRecordsRows = activities;
          }
          this.getApi = true;
        } else {
          notify(res.message, false);
          this.getApi = true;
        }
      });
    },
  },
  mounted () {
    this.getData(this.$route.params.memberUuid);
  },
})
</script>
