
var database = require("../model/database");
var formidable = require("formidable");
var md5 = require("./md5");


exports.login = function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields){
    var name = fields.name;
    var password = md5(fields.password);
    database.loginS(name,password,function(data){
      if(Array.isArray(data) && data.length != 0){
        req.session.name = data[0].name;
        res.send(data[0]);
      }
      else{
        res.send("0");
      }
    });
  })
}
