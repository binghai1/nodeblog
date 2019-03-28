const mysql = require('mysql')
const MYSQL_CONFIG=require('../config/db')
const conn=mysql.createConnection(MYSQL_CONFIG)
conn.connect()

var exec=(sql)=>{
    return new Promise((resolve,reject)=>{
        conn.query(sql,(err,data)=>{
            if(err){
                reject(err)
                return
            }
            resolve(data)
        })  
    })
}
module.exports=exec