import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/pages/home'
import test from '@/pages/test'

import login from '@/pages/login'
import setting from '@/pages/setting'
import trading from '@/pages/trading'
import sell from '@/pages/sell'
import buy from '@/pages/buy'
import handle from '@/pages/handle'
import downLoad from '@/pages/downLoad'
import details from '@/pages/details'
import notice from '@/pages/Notice'
import moreNew from '@/pages/moreNew'
import rules from '@/pages/rules'
import about from '@/pages/about'
import newhelp from '@/pages/newhelp'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/forget',
      name: 'forget',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: login
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '/trading',
      name: 'trading',
      component: trading
    },
    {
      path: '/sell',
      name: 'sell',
      component: sell
    },
    {
      path: '/buy',
      name: 'buy',
      component: buy
    },
    {

      path: '/handle',
      name: 'handle',
      component: handle
    },
    {
      path: '/downLoad',
      name: 'downLoad',
      component: downLoad
    },
    {
      path: '/details',
      name: 'details',
      component: details
    },
    {
      path: '/moreNew',
      name: 'moreNew',
      component: moreNew
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice
    },
    {
      path: '/rules',
      name: 'rules',
      component: rules
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/newhelp',
      name: 'newhelp',
      component: newhelp
    }
  ]
})
router.beforeEach((to, from, next) => {
  // ...
  if (to.path === '/login') {
    localStorage.removeItem('info')
  }
  next()
})
export default router
