const {REDIS_CONFIG}=require('../config/db')
const redis = require('redis')
var client=redis.createClient(REDIS_CONFIG.PORT,REDIS_CONFIG.HOST)
client.on('err',err=>{
    console('错误',err)
})
var set=(key,val)=>{
    if(typeof val==='object'){
        val=JSON.stringify(val)
   
    }
        client.set(key,val,redis.print)
    
}

var get=key=>{
    return new Promise((resolve,reject)=>{
        client.get(key,(err,data)=>{
            if(err){
                reject(err)
            }
            if(!data){
                resolve({})
            }
            try{
                resolve(JSON.parse(data))
            }catch(exception){
                resolve(data)
            }
        })
    })
 
}
  
module.exports={
    set,
    get
}