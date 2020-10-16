$(function () {
  initEvent()
  function initEvent () {
    $('#login-btn').click(function () {
      var username = $('#username').val().trim()
      var password = $('#password').val().trim()
      if (username && password) {
        var loading = weui.loading('loading')
        $.post('/api/account/login', {
          email: username,
          password: password
        }, function (data, status) {
          loading.hide()
          if (status != 'success') {
            return weui.topTips('登录失败：服务器错误' , 3000)
          }
          if (data.code) {
            return weui.topTips('登录失败：' + data.msg, 3000)
          }

          // var token = data.data && data.data.token || ''

          // if (!token) {
          //   return weui.topTips('登录失败：' + data.msg, 3000)
          // }

          weui.toast('登录成功,跳转中...', 3000)
          // $.cookie('uToken', token, { expires: 1, path: '/' })
          setTimeout(() => {
            window.location = '/admin/dashboard'
          }, 500)

        })
      }
    })
  }
})
