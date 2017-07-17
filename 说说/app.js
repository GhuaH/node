var express = require("express");
var formidable = require("formidable");
var md5 = require("./controller/md5");
var home = require("./controller/home");
var user = require("./controller/user");
var login = require("./controller/login");
var regist = require("./controller/register");
var session = require("express-session");

var app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app
  .set("view engine","ejs")
  .use(express.static("./public"))
  .use("/user",express.static("./public"))
  .use("/page",express.static("./public"))

  .get("/",home.homePage)

  .get("/user/:id",user.user)

  .get("/page/:id",user.page)

  .get("/delete/:id",user.delete)

  .post("/add",user.add)

  .post("/doregist",regist.regist)

  .post("/login",login.login)

  .get("/quit",home.quit)

  .listen(3000,"127.0.0.1");