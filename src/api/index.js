import ajax from './ajax'

let baseUrl = '/api'

export const reqAddress = (geohash)=>ajax('/api/position/'+geohash)

export const reqCategory = ()=>ajax(baseUrl+'/index_category')

export const reqShops = ({latitude,longitude})=>ajax('/api/shops',{latitude,longitude})
