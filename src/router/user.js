const {login} = require('../controller/user')
const {set} = require('../db/redis')
const {SuccessModel,ErrorModel} = require('../model/BaseModel')
const userHandle=(req)=>{
    var url = req.url;
    var methods=req.method;
    var baseName=url.split('?')[0]
    if(methods==='POST'&&baseName==='/api/user/login'){
        var {username,password}=req.body
        return login(username,password).then(data=>{
            if(data.username){
                console.log(data.username,999)
                req.session.username=data.username
                req.session.password=data.password
                set(req.sessionId,req.session)
                return new SuccessModel(`${username}登陆成功`)
            }
            return new ErrorModel('错误')
        })
      
    }
   
}
module.exports=userHandle