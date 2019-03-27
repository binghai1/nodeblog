const blogHandle=require('./src/router/blog')
const userHandle=require('./src/router/user')
const querystring = require('querystring');
const {SuccessModel,ErrorModel} =require('./src/model/baseModel')
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
    var userDate=userHandle(req,res)
    handlePost(req).then((chunk)=>{
        req.body=chunk//异步代码
        if(userDate){
            userDate.then(data=>{
                console.log(data)
                res.end(JSON.stringify(data))
                 return
            })
        }
        var blogData=blogHandle(req,res)
        if(blogData){
            blogData.then(data=>{
                console.log(data)
                res.end(JSON.stringify(data))
                 return
            })
        }
        // res.writeHeader(404,'Content-Type','text/plain')
        // const data="404notfound"
        // res.end(data)
    })
    
    // var obj={
    //     name:222,
    //     env:process.env.NODE_ENV
    // }
}
module.exports=serverHanlde
