const express = require("express");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const myuser = require("./routes/myroute.js");
const app = express();
app.configure(
    function () {
        app.set("views",__dirname+"/views");
        app.set("view engine","ejs");
        app.use(express.logger("dev"));
         app.use(express.errorHandler());
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);
        app.use(express.static(__dirname+"/src/"));
        app.use(express.errorHandler());
    }
);
app.set("port",8080);
app.listen(app.get("port"),function(){
    console.log("server is running, port 8080.")
});
app.post("/login.do",myuser.login);
app.get('/',function(req,res){
    res.redirect("login.html")
});
app.get("/order",function(req,res){
    let sql="select * from t_ordertwo";
    let arr=[];
    let myconnection = mysql.createConnection({
        host:"localhost",
        user: "root",
        password: "root",
        port: 3306,
        database: "sanzu"
    });
    myconnection.connect();
    myconnection.query(sql, arr, function (err, data) {
        console.log(err);
        console.log(data);
        if(data.length>0 && data != undefined){
            res.render("order",{myarr:data});
        }
    });
    myconnection.end();
});