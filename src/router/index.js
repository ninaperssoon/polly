import { createRouter, createWebHashHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const routes = [
  {
    path: '/',
    name: 'Start',
    component: StartView
  },
    {
    path: '/poll/:id/:lang/:name',
    name: 'PollView',
    component: () => import(/* webpackChunkName: "about" */ '../views/PollView.vue')
  },
  {
    path: '/create/:lang',
    name: 'CreateIdView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateIdView.vue')
  },
  {
    path: '/create/:lang/:id',
    name: 'CreateView',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateView.vue')
  },
  {
    path: '/join/:lang',
    name: 'JoinView',
    component: () => import('../views/JoinView.vue')
  },
  {
    path: '/host/:lang',
    name: 'HostView',
    component: () => import('../views/HostView.vue')
  },
  {
    path: '/myquizzes/:lang',
    name: 'MyquizzesView',
    component: () => import('../views/MyquizzesView.vue')
  },
  { path: '/createq/:id/:lang',
    name:'CreaterewardView',
    component: () => import('../views/CreaterewardView.vue')

  },
//   { path: '/creater/:lang',
//   name:'CreatequestionView',
//   component: () => import('../views/CreateView.vue')

// },
{ path: '/start/:lang',
  name:'StartView',
  component:StartView

},
{ path: '/host/:id/:lang',
  name: "HostQuizView",
  component: () => import('../views/HostQuizView.vue')
},
{ path: '/wait/:id/:lang/:name',
  name: "WatiView",
  component: () => import('../views/WaitView.vue')
},
{
  path: '/poll/:id/:lang/host',
  name: 'HostPollView',
  component: () => import(/* webpackChunkName: "about" */ '../views/HostPollView.vue')
},
{
  path: '/obs/:id/:lang/:name',
  name: 'ObsView',
  component: () => import('../views/ObsView.vue')
},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
