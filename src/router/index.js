import Vue from 'vue'
import Router from 'vue-router'

import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
Vue.use(Router)

export default new Router({
  mode : "history",
  routes: [
    {
      path:'/',
      redirect:Msite
     },
    {
     path:'/msite',
     components:Msite
    },
    {
      path:'/order',
      components:Order
     },
     {
      path:'/Profile',
      components:Profile
     },
     {
      path:'/search',
      components:Search
     }
  ]
})
 