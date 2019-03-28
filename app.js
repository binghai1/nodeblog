const blogHandle=require('./src/router/blog')
const userHandle=require('./src/router/user')
const querystring = require('querystring');
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
    handlePost(req).then((chunk)=>{
        req.body=chunk//异步代码
        var userDate=userHandle(req,res)
        if(userDate){
            userDate.then(data=>{
                console.log(JSON.stringify(data),333)
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
        // res.write("404notfound\n")
        // res.end()
    })
   

    // var obj={
    //     name:222,
    //     env:process.env.NODE_ENV
    // }
}
module.exports=serverHanlde
