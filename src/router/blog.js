const blogHandle=(req,res)=>{
    var url = req.url;
    var methods=req.method;
    var baseName=url.split('?')[0]
    if(methods==='GET'&&baseName==='/api/blog/list'){
        return{
            msg:"这是博客列表"
        }
    }
    if(methods==='GET'&&baseName==='/api/blog/detail'){
        return{
            msg:"这是博客详情接口"
        }
    }
    if(methods==='Post'&&baseName==='/api/blog/new'){
        return{
            msg:"新建博客"
        }
    }
   
    if(methods==='Post'&&baseName==='/api/blog/update'){
        return{
            msg:"更新博客"
        }
    }
    if(methods==='GET'&&baseName==='/api/blog/del'){
        return{
            msg:"删除博客"
        }
    }
}
module.exports=blogHandle