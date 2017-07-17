$(function(){
        var isR = true;
        $("#btnLogin").click(function(){
          var name = $("#name").val();
          var password = $("#password").val();
          $.post("/login",{
            name: name,
            password: password
          },function(data){
            location.reload();
          })
        })

        $("#registUser").click(function(){
          if($("#agree").prop("checked") == true && $("#inputName").val() != null && $("#inputPassword").val() != null && $("#reInputPassword").val() == $("#inputPassword").val() ){
            var name = $("#inputName").val();
            var password = $("#inputPassword").val();
            $.post("/doregist",{
              name: name,
              password: password
            },function(data){
              location.reload();
              console.log(data);
            })
          }
          else{
            alert("输入有误！");
          }
        })

        $("#btnRegist").click(function(){
          if(!isR){
            $("#shade").css({"display":"none","z-index":0});
            $("#container").css({"display":"none","z-index":999})
            isR = true;
          }
          else{
            var height = window.innerHeight;
            var width = window.innerWidth;
            $("#shade").css({"height":height,"width":width,"display":"block","z-index":998});
            $("#container").css({"display":"block","z-index":999})
            isR = false;
          }
        })

        $("#myPage").click(function(){
          if($("#userName").text() != ""){
            window.location = "/user/" +  $("#userName").text();
          }
          else{
            alert("请登录");
          }
        })
      })