"use strict";
const mysqlpool = require("./dbconfig.js");
const db = mysqlpool.sqlpool();
let user = {
    login: function (req, res) {
        let username = req.body.username;
        let password = req.body.password;
        let sql="select * from admin where a_name = ? and a_pasword = ?";
        let arr = [username,password];
        function cbLogin(err,data){
            if(data.length>0 && data != undefined){
                //req.session.user=username;
                res.redirect("index.html");
            }else{
                res.redirect("login.html");
            }
        }
        db.connect(sql,arr,cbLogin);
    }
};
module.exports=user;
