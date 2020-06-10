import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART
}   from './mutation-types'
import {
  reqAddress,
  reqCategory,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../api/index.js';

export default {
 async  getAddress({commit,state}){
        let{latitude,longitude}=state
        let params = latitude + ',' +longitude
        let result = await reqAddress(params)
        commit(RECEIVE_ADDRESS, {
            address: result.data
          })
    },
    async getCategorys({commit}){
        let result = await reqCategory()
        commit(RECEIVE_CATEGORYS, {
        categorysx: result.data
      })
    }, 
  async  getShops({
        commit,
        state
    }){
        let {latitude,longitude}=state
        let result = await reqShops({latitude,longitude})
        commit(RECEIVE_SHOPS,{shops:result.data})
    },

     recordUser({commit},user) {
      console.log(user);
      commit(RECEIVE_USER_INFO,{userInfo:user})
    },

    async getUserInfo({commit}){
      let result = await reqUserInfo()
      if(result.code==0){
        let user = result.data
        commit(RESET_USER_INFO,{userInfo:user})
      }
    },

    async getLogout({commit}){
      let result = await reqLogout()
      if(result.code==0){
        commit(RESET_USER_INFO)
      } 
    },

    async getShopGoods({commit},callback){
      let result = await reqShopGoods()
      if(result.code==0){
        let goods = result.data
        commit(RECEIVE_GOODS,{goods})
        callback&callback()
      }
    },
    async getShopInfo({commit}){
      let result = await reqShopInfo()
      if(result.code==0){
        let info = result.data
        commit(RECEIVE_INFO,{info})
      }
    },

    async getShopRatings({commit}){
      let result = await reqShopRatings()
      if(result.code==0){
        let ratings = result.data
        commit(RECEIVE_RATINGS,{ratings})
      }
    },
  updateFoodCount({commit},{isflag,food}){
    if(isflag){
      commit(INCREMENT_FOOD_COUNT,{food})
    }else{
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },
  clearCart({commit}){
    commit(CLEAR_CART)
  }
}