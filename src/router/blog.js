const {blogList,getDetail,newBlog,updateBlog,delBlog}=require("../controller/blog")
const {SuccessModel,ErrorModel}=require("../model/BaseModel")
const checkUser=(req)=>{
    if(!req.session.username){
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}
const blogHandle=(req,res)=>{
    var url = req.url;
    var methods=req.method;
    var baseName=url.split('?')[0]
    var id=req.query.id
    if(methods==='GET'&&baseName==='/api/blog/list'){
        
        let {author,keyword}=req.query
        if (req.query.isadmin) {
            // 管理员界面
            const loginCheckResult = checkUser(req)
            if (loginCheckResult) {
              // 未登录
              return loginCheckResult
            }
            // 强制查询自己的文章
            author = req.session.username
          }
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
        var loginCheck=checkUser(req)
        console.log(loginCheck,999)
        if(loginCheck){
            return loginCheck
        }
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
        var loginCheck=checkUser(req)
        if(loginCheck){
            return loginCheck
        }
        return updateBlog(id,req.body).then((data)=>{
            if(data){
                return new SuccessModel()
            }
            return new ErrorModel("错误")
            
        })
    }
    if(methods==='GET'&&baseName==='/api/blog/del'){
        var loginCheck=checkUser(req)
        if(loginCheck){
            return loginCheck
        }   
        return delBlog(id).then((data)=>{
            if(data){
                return new SuccessModel()
            }
            return new ErrorModel("错误")
            
        })
    }
}
module.exports=blogHandle