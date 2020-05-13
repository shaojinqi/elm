import axios from 'axios'


export default function ajax(url,data={},type='get') {
return new Promise(function (resolve,reject) {
  let myPromise
  if(type=='get'){
    let dataStr =''
    Object.keys(data).forEach(key=>{
      // console.log(data[key]);
      dataStr += key + '=' +data[key]+'&'     
        // console.log(dataStr); 
    })  
    if(dataStr !==''){
       let index = dataStr.lastIndexOf('&')
      // console.log(index);
      let newStr = dataStr.substring(0,index)
      console.log(newStr);
        url = url +'?'+dataStr
        myPromise = axios.get(url)
    }else{
        myPromise = axios.get(url)
    }
    
}else{
  myPromise=  axios.post(url, data)
}
myPromise.then(res=>{
  resolve(res.data)

}).catch(err=>{
  reject(err)
})
})

}

