var data = require("../model/data");

var message = {
  name: false,
  tips: [],
  page: 1,
  size: 5,
  count: 0
};

exports.homePage = function(req, res){
  data.getAllCount(function(count){
    data.homePage({},message.size,count,function(result){
      message.tips = result;
      message.name = req.session.name;
      res.render("index",message);
    });
  })
}

exports.quit = function(req, res){
  req.session.destroy(function(err){
    message.name = false;
    res.redirect("/");
  })
}

