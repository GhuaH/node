var data = require("../model/data");
var formidable = require("formidable");

var message = {
  name: false,
  tips: [],
  page: 1,
  size: 5,
  count: 0
};

exports.user = function(req, res){
  if(req.session.name){
    var name = req.params.id;
    data.getCount(name,function(count){
      data.showMessage({"name":name},message.size,1,count,function(result){
        message.page = Math.ceil(count / message.size);
        message.name = req.session.name;
        message.count = count;
        message.tips = result;
        res.render("note",message);
      });
    });
  }
  else{
    res.redirect("/")
  }
}

exports.page = function(req, res){
  if(req.session.name){
    data.getCount(req.session.name,function(count){
      data.showMessage({"name":req.session.name},message.size,req.params.id,count,function(result){
        message.page = Math.ceil(count / message.size);
        message.name = req.session.name;
        message.count = count;
        message.tips = result;
        res.render("note",message);
      });
    });
  }
  else{
    res.redirect("/")
  }
}

exports.delete = function(req, res){
  var obj = {
    content: req.params.id
  }
  data.deleteOne(obj,function(){
    res.redirect("/user/"+req.session.name);
  })
}

exports.add = function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields){
    var name = req.session.name;
    var cont = fields.cont;
    data.addMessageData(name,cont,function(db){
      res.redirect("/user/"+name);
    });
  })
}