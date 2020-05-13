import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS
}   from './mutation-types'
import { reqAddress, reqCategory,reqShops } from '../api/index.js'


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
    }
}