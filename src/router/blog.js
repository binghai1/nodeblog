const {blogList,getDetail,newBlog,updateBlog,delBlog}=require("../controller/blog")
const {SuccessModel}=require("../model/BaseModel")
const blogHandle=(req,res)=>{
    var url = req.url;
    var methods=req.method;
    var baseName=url.split('?')[0]
    if(methods==='GET'&&baseName==='/api/blog/list'){
        let {author,keyword}=req.query
        var res=blogList(author,keyword)
        return res.then(data=>{
            console.log(data)
            return new SuccessModel(res)
        })
      
    }
    if(methods==='GET'&&baseName==='/api/blog/detail'){
        let {id}=req.query
        var res=getDetail(id)
        return new SuccessModel(res)
    }
    if(methods==='POST'&&baseName==='/api/blog/new'){
        let {blog}=req.body
        let res=newBlog(blog)
        return res.then(data=>{
            console.log(data)
            return new SuccessModel(data)
        }).catch((err)=>{
            console.log(err)
            return 
        })
    }
    if(methods==='POST'&&baseName==='/api/blog/update'){
        let {blog,id}=req.body
        let res=updateBlog(blog,id)
        return new SuccessModel(res)
    }
    if(methods==='GET'&&baseName==='/api/blog/del'){
        let {id}=req.body
        let res=delBlog(id)
        return new SuccessModel(res)
    }
}
module.exports=blogHandle