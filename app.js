const blogHandle=require('./src/router/blog')
const userHandle=require('./src/router/user')
const querystring = require('querystring');
const {set,get}=require('./src/db/redis')
const computedExpirTime=()=>{
    var date = new Date()
    date.setTime(date.getTime()+24*60*60*1000)
    return date.toGMTString()
}
const handlePost=(req)=>{
    return new Promise((resolve,reject)=>{
        if(req.method!='POST'){
            resolve({})
            return
        }
        if(req.headers['content-type']!=='application/json'){
            resolve({})
            return
        }
        var buffer=[];
        req.on('data',(data)=>{
            buffer.push(data)
        })
        req.on('end',()=>{
            resolve(JSON.parse(Buffer.concat(buffer).toString()))
        })
    })
}
const serverHanlde= (req,res)=>{
    res.setHeader('Content-Type','application/json')
    req.query=querystring.parse(req.url.split('?')[1])
    var cookieStr=req.headers.cookie||''
    console.log(cookieStr,888)
    req.cookie={}
    cookieStr.split(';').map(item=>{
        if (!item) return
        var item=item.split('=')
        var key=item[0].trim()
        var val=item[1].trim()
        req.cookie[key]=val
    })
    var needSetCookie=false
    var userId=req.cookie.userId
    if(!userId){
        needSetCookie=true
        userId=`${Date.now()}_${Math.random()}`
        console.log(userId,88)
        set(userId,{})
    }
    console.log(userId,99)
    
    req.sessionId=userId
    get(req.sessionId).then(data=>{
        if(!data){
            data=set(req.sessionId,{})
        }
        req.session=data
        return handlePost(req)
    }).then((chunk)=>{
        req.body=chunk//异步代码
        var userDate=userHandle(req,res)    
        if(userDate){
            userDate.then(data=>{
                if(needSetCookie){
                    res.setHeader('Access-Control-Allow-Credentials', 'true')
                    res.setHeader(
                        "Set-Cookie",
                        `userId=${userId}; path='/'; httpOnly; expires=${computedExpirTime()}`
                      );
                }
                res.end(JSON.stringify(data))
            })
            return
        }
        var blogData=blogHandle(req,res)
        if(blogData){
           
            blogData.then(data=>{
                if(needSetCookie){
                    res.setHeader(
                        "Set-Cookie",
                        `userId=${userId}; path='/'; httpOnly; expires=${computedExpirTime()}`
                      );
                }
                console.log(data)
                res.end(JSON.stringify(data))
            })
            return
        }
        res.writeHeader(404,'Content-Type','text/plain')
        res.write("404notfound\n")
        res.end()
    })
   

    // var obj={
    //     name:222,
    //     env:process.env.NODE_ENV
    // }
}
module.exports=serverHanlde
