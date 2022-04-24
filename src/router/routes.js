
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name: 'login', component: () => import('src/pages/Login.vue') },
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', name: 'home', component: () => import('src/pages/Index.vue') },
    ]
  },
  {
    path: '/users',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/users', name: 'users', meta: { title: '權限管理' },component: () => import('src/pages/users/Users.vue') },
    ]
  },
  {
    path: '/banner',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/banner', name: 'banner', meta: { title: '輪播圖管理' },component: () => import('src/pages/banner/Banner.vue') },
    ]
  },
  {
    path: '/banner',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/banner/create', name: 'bannerCreate', meta: { title: '輪播圖新增' },component: () => import('src/pages/banner/bannerCreate.vue') },
    ]
  },
  {
    path: '/news',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/news', name: 'news', meta: { title: '最新消息管理' },component: () => import('src/pages/news/News.vue') },
    ]
  },
  {
    path: '/news/create',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/news/create', name: 'newsCreate', meta: { title: '最新消息新增' },component: () => import('src/pages/news/NewsCreate.vue') },
    ]
  },
  {
    path: '/news/edit/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/news/edit/:id', name: 'newsEdit', meta: { title: '最新消息編輯' },component: () => import('src/pages/news/NewsEdit.vue') },
    ]
  },
  {
    path: '/members',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/members', name: 'members', meta: { title: '會員管理' },component: () => import('src/pages/members/Members.vue') },
    ]
  },
  {
    path: '/members/view/:memberId',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/members/view/:memberId', name: 'membersView', meta: { title: '會員管理 | 檢視' },component: () => import('src/pages/members/MembersView.vue') },
    ]
  },
  {
    path: '/members/view/:memberId/:runningId',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/members/view/:memberId/:runningId', name: 'membersRunningInfo', meta: { title: '會員管理 | 跑步紀錄' },component: () => import('src/pages/members/membersRunningInfo.vue') },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
