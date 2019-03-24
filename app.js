const blogHandle=require('./src/router/blog')
const userHandle=require('./src/router/user')
const serverHanlde= (req,res)=>{
    res.setHeader('Content-Type','application/json')
    var userDate=userHandle(req,res)
    if(userDate){
        res.end(JSON.stringify(userDate))
        return
    }
    var blogData=blogHandle(req,res)
    if(blogData){
        res.end(JSON.stringify(blogData))
        return
    }
    res.writeHeader(404,'Content-Type','text/plain')
    const data="404notfound"
    res.end(data)
    // var obj={
    //     name:222,
    //     env:process.env.NODE_ENV
    // }
}
module.exports=serverHanlde
