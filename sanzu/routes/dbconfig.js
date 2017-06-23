const mysql = require("mysql");
"use strict";
module.exports.sqlpool = function (){
    let pool ={
            config:{
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'sanzu',
                port: 3306,
            },
        connect:function(sql,arr,fn){
            var pool=mysql.createPool(this.config);
            pool.getConnection(function(err,connection){
                if(err){
                    console.log(err)
                }
                connection.query(sql,arr,fn);
                connection.release();
            });
        }
    };
    return pool;
};


