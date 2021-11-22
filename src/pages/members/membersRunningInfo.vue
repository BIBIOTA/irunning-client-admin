<template>
  <q-page>
    <q-card style="min-width: 80%">
      <CustomTitle :title="'午後跑步'" />
      <List
        :initialGetApi="getApi"
        :initialRows="runningInfo" />
      <q-card-section class="row item-center">
        <GoogleMap
          ref="mapRef"
          v-if="flightPath?.path?.length > 0"
          :api-key="GAPI_KEY"
          :center="{lng: 0, lat: 0}"
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
import { defineComponent, ref, reactive } from 'vue';
import List from 'src/components/List.vue';
import CustomTitle from 'src/components/CustomTitle.vue';
import polyline from '@mapbox/polyline';
import { GoogleMap, Polyline } from 'vue3-google-map';
import Btns from 'src/components/Btns.vue';
import { members } from 'src/libs/members.js';
import { timeFormat } from 'src/const/dateTool.js';

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
    const mapRef = ref(null);

    const GAPI_KEY = process.env.GAPI_KEY;


    return {
      runningInfo: reactive([
        {
          title: '日期',
          start_date_local: '',
        },
        {
          title: '距離',
          distance: '',
        },
        {
          title: '配速',
          pace: '',
        },
        {
          title: '時間',
          moving_time: '',
        },
        {
          title: '平均心率',
          average_heartrate: '',
        },
        {
          title: '最大心率',
          max_heartrate: '',
        },
        {
          title: '平均踏頻',
          average_cadence: '',
        },
        {
          title: '卡路里',
          calories: '',
        },
        {
          title: '紀錄裝置',
          device_name: '',
        },
      ]),
      flightPath: reactive({
        path: [],
        geodesic: true,
        strokeColor: '#388E3C',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      }),
      mapRef,
      getApi: ref(true),
      GAPI_KEY,
    }
  },
  methods: {
    getData(user_id, id) {
      this.getApi = false;
      members.runningInfo({user_id, id}).then((res) => {
        if (res.status) {
          Object.keys(res.data).forEach((key) => {
            this.runningInfo.forEach((item) => {
              if (key in item) {
                if (key === 'distance') {
                  item[key] = `${res.data[key]}公里`;
                } else if (key === 'pace') {
                  item[key] = `${res.data[key]}km`;
                } else if (key === 'moving_time') {
                  item[key] = timeFormat(res.data[key]);
                } else if (key === 'average_heartrate') {
                  item[key] = `${res.data[key]}bpm`;
                } else if (key === 'max_heartrate') {
                  item[key] = `${res.data[key]}bpm`;
                } else if (key === 'average_cadence') {
                  item[key] = `${ Math.round(res.data[key] * 2) }spm`;
                } else {
                  item[key] = res.data[key];
                }
              }
            });
          });
          if (res.data.map?.summary_polyline) {
            this.flightPath.path = this.getPath(res.data.map.summary_polyline);
          }
          this.getApi = true;
        } else {
          notify(res.message, false);
          this.getApi = true;
        }
      });
    },
    getPath(map) {
      const mapData = polyline.decode(map);
      const path = [];
      for (let i = 0; i <= mapData.length -1; i ++) {
        const [lat, lng] = mapData[i];
        path.push({lat, lng});
      }
      return path;
    },
  },
  watch: {
    getApi(data) {
      if (data && this.flightPath?.path?.length > 0) {
        this.$nextTick(() => {
          const bounds = new this.$refs.mapRef.api.LatLngBounds();
          const { path } = this.flightPath;
          if (path.length > 0) {
            path.forEach((geo) => {
              bounds.extend(geo);
            });
          }
          this.$refs.mapRef.map.fitBounds(bounds);
        });
      }
    },
  },
  created() {
    const { uuid, runningUuid } = this.$route.params;
    if (uuid && runningUuid) {
      this.getData(uuid, runningUuid);
    } else {
      notify('錯誤:缺少會員或跑步資訊', false);
    }
  },
})
</script>
