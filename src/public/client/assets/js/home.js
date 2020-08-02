$(function () {
  // 自动运行typing
  var $typeTitle = $('#type-title')
  var $typeDetail = $('#type-detail')
  var title = '人生就是一个不断学习成长的过程'
  var detail = ['唯有不断学习', '才能成长']

  typingTitle()

  function typingTitle () {
    // title typing
    typing(title, $typeTitle, function () {
      typingDetail()
    })
  }

  function typingDetail () {
    var i = 0
    function run () {
      if (i >= detail.length) {
        return typeEnd()
      }
      var text = detail[i]
      typing(text, $typeDetail, function () {
        $typeDetail.append('<br/>')
        i++
        run()
      })
    }
    run()
  }

  function typeEnd () {
    setTimeout(function () {
      $typeDetail.empty()
      $typeTitle.empty()
      typingTitle()
    }, 3000)
  }

  function typing (text, container, callback) {
    var i = 0
    var timer = setInterval(function () {
      if (i <= text.length) {
        var prev = container.html()
        container.html(prev + text.slice(i, i + 1))
        i++
      } else if (i > text.length) {
        clearInterval(timer)
        callback && callback()
      }
    }, 100)
  }
})
