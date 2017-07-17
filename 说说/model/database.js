var mongodb = require("mongodb").MongoClient;

var dbUrl = "mongodb://127.0.0.1:27017/user";

function connectDb(callback){
  mongodb.connect(dbUrl,function(err, db){
    if(err){
      console.log("数据库连接失败！");
      return;
    }
    else{
      console.log("数据库连接成功！");
      callback(db);
    }
  })
}

exports.loginS = function(name, password, callback){
  connectDb(function(db){
    db.collection("user").find({"name":name,"password":password},function(err, data){
      var arr = [];
      if(err){
        console.log(err);
        db.close();
        return;
      }
      else if(data){
        data.each(function(err, doc){
          if(doc){
            arr.push(doc);
          }
          else{
            console.log(arr);
            callback(arr);
            db.close();
          }
        })
      }
      else{
        console.log("用户不存在或密码错误！");
        callback("用户不存在或密码错误！");
        db.close();
      }
    })
  });
}

exports.registS = function(name, password, callback){
  connectDb(function(db){
    var rdata = {};
    db.collection("user").find({"name":name},function(err, data){
      if(err){
        console.log(err);
      }
      if(data.length != 0 && Array.isArray(data)){
        console.log("该用户已存在，请重新注册");
        db.close();
        return;
      }
      else{
        db.collection("user").insertOne({"name":name,"password":password},function(err, data){
          if(err){
            console.log("注册失败！");
            rdata.status = "0";
            callback(rdata);
            db.close();
            return;
          }
          console.log("注册成功！");
          rdata.status = "1";
          rdata.name = name;
          callback(rdata);
          db.close();
        })
      }
    })
  });
}