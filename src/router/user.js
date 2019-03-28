const {checkUser} = require('../controller/user')
const {SuccessModel,ErrorModel} = require('../model/BaseModel')
const userHandle=(req)=>{
    var url = req.url;
    var methods=req.method;
    var baseName=url.split('?')[0]
    if(methods==='POST'&&baseName==='/api/user/login'){
        var {username,password}=req.body
        console.log(username,333)
        return checkUser(username,password).then(data=>{
            if(data.username){
                return new SuccessModel()
            }
            return new ErrorModel('错误')
        })
      
    }
   
}
module.exports=userHandle