$(function () {
  // checkStatus()
  // getCategoryList()

  // initEvent()

  function checkStatus () {
    $.ajax({
      type: 'GET',
      url: '/api/account/info',
      beforeSend: function (request) {
        var token = 'Bearer ' + $.cookie('uToken')
        request.setRequestHeader('Authorization', token)
      },
      success: function (result) {
        console.log(result)
        if(result.code ==0){
          var data = result.data
          $('#username').text(data.nickname)
        }
        
      }
    })
  }

  function getCategoryList(){
    var loading = weui.loading('loading')
    $.ajax({
      type: 'GET',
      url: '/api/category/list',
      beforeSend: function (request) {
        var token = 'Bearer ' + $.cookie('uToken')
        request.setRequestHeader('Authorization', token)
      },
      success: function (result) {
        console.log(result)
        
        
      }
    })
  }

  function initEvent () {
  }
})
