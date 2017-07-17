
var database = require("../model/database");
var formidable = require("formidable");
var md5 = require("./md5");


exports.regist = function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields){
    console.log(fields.name , fields.password);
    var name = fields.name;
    var password = md5(fields.password);
    database.registS(name,password,function(status){
      req.session.name = name;
      res.send(name);
    });
  })
}