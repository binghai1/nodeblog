const env = process.env.NODE_ENV;

let  MYSQL_CONFIG
let  REDIS_CONFIG

if(env=='dev')
{
    MYSQL_CONFIG={
        host:"localhost",
        user:'root',
        password:'123456',
        port:"3306",
        database:'blog'
    },
    REDIS_CONFIG={
        PORT:'6379',
        HOST:'localhost'
    }
}
if(env=='pro')
{
    MYSQL_CONFIG={
        host:"localhost",
        user:'root',
        password:'123456',
        port:"3306",
        database:'blog'
    },
    REDIS_CONFIG={
        PORT:'6379',
        HOST:'localhost'
    }
}
module.exports={
    REDIS_CONFIG,
    MYSQL_CONFIG
}


