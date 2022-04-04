<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          v-if="drawerShow"
        />

        <q-toolbar-title>
          I Running
        </q-toolbar-title>

        <q-btn
          @click="logout"
          push
          color="white"
          text-color="primary"
          round
          icon="logout"
          size="12px"
          v-if="drawerShow"
        />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="drawerShow"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          後台管理
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: '權限管理',
    icon: 'account_circle',
    link: '/users',
  },
  {
    title: '最新消息管理',
    icon: 'newspaper',
    link: '/news',
  },
  {
    title: '會員管理',
    icon: 'face',
    link: '/members',
  },
  {
    title: '跑點管理',
    icon: 'directions_run',
    link: '/spots',
  },
  {
    title: 'SEO管理',
    icon: 'public',
    link: '/seo',
  },
];

import { defineComponent, ref } from 'vue'
import { mapState, mapActions } from 'vuex';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  methods: {
    ...mapActions([
      'logoutAction',
    ]),
    logout() {
      this.logoutAction().then(() => {
        this.$router.push('/');
      });
    },
  },

  computed: {
    ...mapState([
      'token',
    ]),
    drawerShow() {
      if (this.token) {
        return true;
      }
      return false;
    },
  },
})
</script>
