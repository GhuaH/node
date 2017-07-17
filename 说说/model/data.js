var mongodb = require("mongodb").MongoClient;

var dbUrl = "mongodb://127.0.0.1:27017/message";

exports.addMessageData = function(name, cont,callback){
  mongodb.connect(dbUrl,function(err, db){
    if(err){
      console.log("数据库连接失败！");
      db.close();
      return;
    }
    db.collection("message")
      .insertOne({"name":name,"content":cont,"time":new Date()},function(err, doc){
        if(err){
          console.log("插入失败！");
          db.close();
          return;
        }
        console.log("插入成功！");
        callback(db);
        db.close();
      })
  })
}

exports.showMessage = function(obj,size,page,count,callback){
  mongodb.connect(dbUrl,function(err, db){
    if(err){
      console.log("数据库连接失败！");
      return;
    }
    db.collection("message")
      .find(obj,function(err, data){
        var num = count-size*page;
        if(num<0){
          num = 0;
          size = parseInt(size) + parseInt(count-size*page);
        }
        console.log(size);
        data.limit(parseInt(size)).skip(num);
        if(err){
          console.log(err);
          db.close();
          return;
        }
        var arr = [];
        data.each(function(err, doc){
          if(doc){
            arr.push(doc);
          }
          else{
            callback(arr);
            db.close();
          }
        })
      })
  })
}

exports.homePage = function(obj,size,count,callback){
  mongodb.connect(dbUrl,function(err, db){
    if(err){
      console.log("数据库连接失败！");
      return;
    }
    db.collection("message")
      .find(obj,function(err, data){
        data.limit(size).skip(count-size);
        if(err){
          console.log(err);
          db.close();
          return;
        }
        var arr = [];
        data.each(function(err, doc){
          if(doc){
            arr.push(doc);
          }
          else{
            callback(arr);
            db.close();
          }
        })
      })
  })
}

exports.getCount = function(name,callback){
  mongodb.connect(dbUrl,function(err, db){
    if(err){
      console.log("数据库连接失败！");
      db.close();
      return;
    }
    db.collection("message").find({"name":name}).count({}).then(function(count){
      callback(count);
      db.close();
    })
  })
}

exports.getAllCount = function(callback){
  mongodb.connect(dbUrl,function(err, db){
    if(err){
      console.log("数据库连接失败！");
      db.close();
      return;
    }
    db.collection("message").count({}).then(function(count){
      callback(count);
      db.close();
    })
  })
}

exports.deleteOne = function(obj,callback){
  mongodb.connect(dbUrl,function(err, db){
    if(err){
      console.log("数据库连接失败！");
      db.close();
      return;
    }
    console.log(obj);
    db.collection("message").remove(obj,function(err,doc){
      if(err){
        console.log("删除失败");
        db.close();
        return;
      }
      console.log("删除成功");
      callback();
      db.close();
    })
  })
}