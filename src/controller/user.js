const query = require('../db/index')
const login=(username,password)=>{
    var sql=`select * from users where username='${username}' and password='${password}'`
    return query(sql).then((rows)=>{
        return rows[0] || {}
    }).catch((err)=>{
        console.log(err)
    })
}
module.exports={
    login
}