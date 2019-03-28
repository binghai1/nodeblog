const {blogList,getDetail,newBlog,updateBlog,delBlog}=require("../controller/blog")
const {SuccessModel,ErrorModel}=require("../model/BaseModel")
const blogHandle=(req,res)=>{
    var url = req.url;
    var methods=req.method;
    var baseName=url.split('?')[0]
    var id=req.query.id
    if(methods==='GET'&&baseName==='/api/blog/list'){
        let {author,keyword}=req.query
        var res=blogList(author,keyword)
        return res.then(data=>{
            return new SuccessModel(data)
        }).catch((err)=>{
            console.log(err,"222")
        })
      
    }
    if(methods==='GET'&&baseName==='/api/blog/detail'){
       return getDetail(id).then((data)=>{
            if(data){
                return new SuccessModel(data)
            }
            
        })
    }
    if(methods==='POST'&&baseName==='/api/blog/new'){
        let blog=req.body
        let res=newBlog(blog)
        return res.then(data=>{
            return new SuccessModel(data)
        }).catch((err)=>{
            console.log(err)
            return new ErrorModel("错误")
        })
    }
    if(methods==='POST'&&baseName==='/api/blog/update'){
        let {id,content,title}=req.body
        var author='hai'
        return updateBlog(id,content,title).then((data)=>{
            if(data){
                return new SuccessModel()
            }
            return new ErrorModel("错误")
            
        })
    }
    if(methods==='GET'&&baseName==='/api/blog/del'){
        return delBlog(id).then((data)=>{
            if(data){
                return new SuccessModel()
            }
            return new ErrorModel("错误")
            
        })
    }
}
module.exports=blogHandle