
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
    path: '/members',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/members', name: 'members', meta: { title: '會員管理' },component: () => import('src/pages/members/Members.vue') },
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
