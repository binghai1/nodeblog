class BaseModel{
    constructor(data,msg){
        if(typeof data ==='string'){
            this.msg=data;
            this.data=null;
            this.msg=null;
        }else{
            this.data=data&&data;
            this.msg=msg&&msg;
        }
        
    }
}
class SuccessModel extends BaseModel{
    constructor(data,msg){
        super(data,msg)
        this.errno=0
    }
}
class ErrorModel extends BaseModel{
    constructor(data,msg){
        super(data,msg)
        this.errno=-1
    }
}
module.exports={
    SuccessModel,
    ErrorModel
}