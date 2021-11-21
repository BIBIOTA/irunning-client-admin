<template>
  <q-page>
    <q-card style="min-width: 80%">
      <CustomTitle :title="'午後跑步'" />
      <List
        :initialGetApi="getApi"
        :initialRows="runningInfo" />
      <q-card-section class="row item-center">
        <GoogleMap
          v-if="flightPath?.path?.length > 0"
          api-key="AIzaSyD_6zCWNrsF0BKAAhv0-bhcwYYw6TM5ZNQ"
          :center="{ lat: 37.772, lng: -122.214 }"
          :zoom="3"
          style="width: 100%; height: 300px"
          >
          <Polyline
            ref="polyline"
            :options="flightPath" 
          />
        </GoogleMap>
      </q-card-section>
    </q-card>
    <Btns />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Title from 'src/components/Title.vue';
import List from 'src/components/List.vue';
import CustomTitle from 'src/components/CustomTitle.vue';
import { GoogleMap, Polyline } from 'vue3-google-map';
import Btns from 'src/components/Btns.vue';

export default defineComponent({
  name: 'membersRunningInfo',

  components: {
    List,
    CustomTitle,
    Btns,
    GoogleMap,
    Polyline,
  },

  setup () {
    const flightPlanCoordinates = [
      { lat: 37.772, lng: -122.214 },
      { lat: 21.291, lng: -157.821 },
      { lat: -18.142, lng: 178.431 },
      { lat: -27.467, lng: 153.027 },
    ];
    return {
      runningInfo: ref([
        {
          title: '日期',
          date: '2021年 12-21 12:12:12',
        },
        {
          title: '距離',
          distance: '21公里',
        },
        {
          title: '配速',
          pace: '22 km',
        },
        {
          title: '時間',
          time: '2小時10分10秒',
        },
        {
          title: '平均心率',
          average_heartrate: '22 bpm',
        },
        {
          title: '最大心率',
          max_heartrate: '22 bpm',
        },
        {
          title: '平均踏頻',
          average_cadence: '22 spm',
        },
        {
          title: '卡路里',
          calories: '121',
        },
        {
          title: '紀錄裝置',
          device_name: 'Garmin',
        },
      ]),
      flightPath: {
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      },
      getApi: ref(true),
    }
  },
  methods: {},
  created() {},
})
</script>
