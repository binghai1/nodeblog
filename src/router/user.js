const userHandle=(req,res)=>{
    var url = req.url;
    var methods=req.method;
    var baseName=url.split('?')[0]
    if(methods==='GET'&&baseName==='/api/user/login'){
        return{
            msg:"登陆接口"
        }
    }
   
}
module.exports=userHandle