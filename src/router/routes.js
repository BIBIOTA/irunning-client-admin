
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
    path: '/members',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/members', name: 'members', meta: { title: '會員管理' },component: () => import('src/pages/members/Members.vue') },
    ]
  },
  {
    path: '/members/view/:memberUuid',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/members/view/:memberUuid', name: 'membersView', meta: { title: '會員管理 | 檢視' },component: () => import('src/pages/members/MembersView.vue') },
    ]
  },
  {
    path: '/members/view/:memberUuid/:runningUuid',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/members/view/:memberUuid/:runningUuid', name: 'membersRunningInfo', meta: { title: '會員管理 | 跑步紀錄' },component: () => import('src/pages/members/membersRunningInfo.vue') },
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
