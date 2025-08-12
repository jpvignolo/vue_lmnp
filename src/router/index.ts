import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/connexion_lmnp',
      name: 'connexion',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConnexionView.vue'),
      children: [
        {
          path: '',
          components: {
            left: () => import('@/components/LoginLeft.vue'),
            main: () => import('@/components/LoginMain.vue'),
          }
        }
      ]
    },
    {
      path: '/inscription_lmnp',
      name: 'inscription',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConnexionView.vue'),
      children: [
        {
          path: '',
          components: {
            left: () => import('@/components/SubscribeLeft.vue'),
            main: () => import('@/components/SubscribeMain.vue'),
          }
        }
      ]
    },{
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DashboardView.vue'),
      children: [
        {
          path: '',
          components: {
            left: () => import('@/components/DashboardLeft.vue'),
            main: () => import('@/components/DashboardList.vue'),
          }
        }
      ]
    },
  ],
})

export default router
