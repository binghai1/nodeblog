const query = require('../db/index')
const blogList=(author,keyword)=>{
     const sql=`select * from blog where 1=1`
     if(author){
         sql+=`author=${author}`
     }
     if(keyword){
        sql+=`keyword=${keyword}`
     }
     sql+='order by createtime desc'
     var res=query(sql)
     console.log(res,222)
     return res
}
const getDetail=(id)=>{
    return[
        {
            id:1,
            title:"标题1",
            content:"内容1",
            createTime:"212314141",
            author:"zhangshan"

        }
    ]
}
const newBlog=(blog={})=>{
    const sql=`insert into blog (title,content,createtime,author) values('刘子','这是一本斗智斗勇的传奇小说','1553677311815','海哥')`
    var result=query(sql)
    return result
       

}
const updateBlog=(blog={},id)=>{
    return true
}
const delBlog=(id)=>{
    return true
}
module.exports={
    blogList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}