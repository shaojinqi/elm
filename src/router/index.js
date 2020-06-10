import Vue from 'vue'
import Router from 'vue-router'
 
import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'

import Login from '@/pages/Login/Login.vue'

import Shop from '@/pages/Shop/Shop.vue'

import ShopGoods from '@/pages/Shop/ShopGoods/ShopGoods'

import ShopInfo from '@/pages/Shop/ShopInfo/ShopInfo'

import ShopRatings from '@/pages/Shop/ShopRatings/ShopRatings'


Vue.use(Router)


export default new Router(
  {
    mode: "history",
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
     path: '/msite',
     component:Msite,
     meta: {requiresAuth: true}
    },
    {
      path:'/order',
      component:Order,
      meta: {requiresAuth: true}
     },
     {
      path:'/profile',
      component:Profile,
      meta: {requiresAuth: true}
     },
     {
      path:'/search',
      component:Search,
      meta: {requiresAuth: true}
     },
     {
      path: '/login',
      component: Login
  },
  {
    path: '/shop',
    component:Shop,
    children:[
      {path:'/shop/goods',component:ShopGoods},
      {path:'/shop/ratings',component:ShopRatings},
      {path:'/shop/info',component:ShopInfo},
      {path:'/',redirect:'/shop/goods'}
    ]
  }

  ]
})

//eta 字段就是路由元信息字段，requiresAuth 
//是自己起的字段名称，用来标记这个路由信息是否需要检测，true 表示要检测，false 表示不需要检测
 