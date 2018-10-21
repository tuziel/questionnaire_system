import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: () => import('./views/Home')
  }, {
    path: '/addpaper',
    name: 'addpaper',
    component: () => import('./views/paperEditor')
  }, {
    path: '/editpaper',
    name: 'editpaper',
    component: () => import('./views/paperEditor')
  }, {
    path: '/preview',
    name: 'preview',
    component: () => import('./views/paperEditor/preview')
  }, {
    path: '/charts',
    name: 'charts',
    component: () => import('./views/paperEditor/charts')
  }]
})
