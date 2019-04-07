const query = require('../db/index')
const blogList=(author,keyword)=>{
     var sql=`select * from blog where 1=1`
     if(author){
         sql+=` and author='${author}'`
     }
     if(keyword){
        sql+=` and title like '%${keyword}%'`
     }
     sql+=' order by createtime desc'
     return  query(sql)
}
const getDetail=(id)=>{
    const sql=`select * from blog where id=${id}`
    return query(sql).then((rows)=>{
        return rows[0]
    })
}
const newBlog=(blog={})=>{
    const {title,content,createtime,author}=blog
    const sql=`insert into blog (title,content,createtime,author) values('${title}','${content}','${createtime}','${author}')`
    return query(sql).then(row=>{
        console.log(row)
        if(row.affectedRows>0){
            return {
                id:row.insertId
            }
        }
    })
}
const updateBlog=(id,blog)=>{
    const {content,title}=blog
    const sql=`update blog set title='${title}',content='${content}' where id='${id}'` 
    return query(sql).then((row)=>{
        if(row.affectedRows>0){
            return true
        }
            return false
    }).catch((err)=>{
        console.log("err",err)
    } )
}
const delBlog=(id)=>{
    const sql=`delete from blog where id=${id}`
    return query(sql).then((row)=>{
        if(row.affectedRows>0){
            return true
        }
            return false
    })
}
module.exports={
    blogList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}