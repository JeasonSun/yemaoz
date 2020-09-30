$(function () {
    initEvent()
    function initEvent(){
      $('#login-btn').click(function(){
        var username = $('#username').val().trim()
        var password = $('#password').val().trim()
        if(username && password){
          $('#loading').show()
          $.post('/cms/account/login', {
            email:username,
            password: password
          }, function(data, status){
            console.log(data, status)
            $('#loading').hide()
            if(data.code){
              
            }
          })
        }
      })
    }
})
