import ajax from './ajax'

let BASE_URL = '/api'

export const reqAddress = (geohash)=>ajax('/api/position/'+geohash)

export const reqCategory = ()=>ajax(BASE_URL+'/index_category')

export const reqShops = ({latitude,longitude})=>ajax('/api/shops',{latitude,longitude})


//用户名密码登陆
export const reqPwdLogin = ({name,pwd,captcha})=>ajax(BASE_URL+'/login_pwd',{name,pwd,captcha},'POST')
export const reqSendCode = (phone)=>ajax(BASE_URL+'/sendcode',{phone})
export const reqSmsLogin = (phone,code)=>ajax(BASE_URL+'/login_sms',{phone,code},'POST')
export const reqUserInfo = ()=>ajax(BASE_URL+'/userinfo')
export const reqLogout = ()=>ajax(BASE_URL+'/logout')


export  const reqShopGoods=()=>ajax('/goods')
export  const reqShopRatings=()=>ajax('/ratings')
export  const reqShopInfo=()=>ajax('/info')
