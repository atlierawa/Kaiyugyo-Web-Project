// JSLint settings
/*global $, jQuery, alert*/
/*jslint plusplus: true*/

// Contact form checker

function checkForm() {
  'use strict';
  var status = false, emailRegEx = /^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,4}$/i;

  if (document.forms['ss-form']['entry.1592956592'].value === "" && document.forms['ss-form']['entry.1573658342'].value === "") {
    $('#ss-submit').replaceWith($('#ss-submit').clone(true));
    $('#ss-submit').addClass('click-shake');
    $('.form-name,.form-email').addClass('form-warning');
  } else if (document.forms['ss-form']['entry.1592956592'].value === "") {
    $('#ss-submit').replaceWith($('#ss-submit').clone(true));
    $('#ss-submit').addClass('click-shake');
    $('.form-email').removeClass('form-warning');
    $('.form-name').addClass('form-warning');
  } else if (document.forms['ss-form']['entry.1573658342'].value === "") {
    $('#ss-submit').replaceWith($('#ss-submit').clone(true));
    $('#ss-submit').addClass('click-shake');
    $('.form-name').removeClass('form-warning');
    $('.form-email').addClass('form-warning');
  } else if (document.forms['ss-form']['entry.1573658342'].value.search(emailRegEx) === -1) {
    $('#ss-submit').replaceWith($('#ss-submit').clone(true));
    $('#ss-submit').addClass('click-shake');
    $('.form-name').removeClass('form-warning');
    $('.form-email').addClass('form-warning');
  } else {
    status = true;
    $('#ss-submit').removeClass('click-on').addClass('click-off').attr('disabled', true);
    $('.form-name, .form-email').removeClass('form-warning');
    $('.formtest-inside').delay(500).animate({'height': '0%'}, 300);
    $('.sent-message').delay(500).css({'visibility': 'initial'}).animate({'opacity': 1}, 300);
  }
  return status;
}

// Recent posts

(function ($) {
  'use strict';
  $.fn.notifyGen = function () {
    var $this = null,
      tag = '',
      nesting = '',
      date = '',
      title = '',
      post_url = '',
      dataList = [],
      url = 'cafe-kaiyuugyo.jp',
      key = 'Wb56LYSYz4N9xAm21f2X7xeVCkoygaRMyeBYSh3pFC7FaSXdE8';

    function renderData() {
      $this.empty();
      $.each(dataList, function (idx, a) {
        nesting = $('<li>').append(
          $('<a>').attr({
            'href': a.url,
            'title': a.title
          })
            .html(a.date + '&nbsp;' + '-' + '&nbsp' + a.title)
        );
        $this.append(nesting);
      });
    }

    function processResponse(data) {
      var i;
      $this.empty();
      if (data.response.total_posts === 0) {
        $this.append($('<li>お知らせはありません</li>'));
      } else {
        $.each(data.response.posts, function (idx, post) {
          date = post.date.substr(5, 5).replace('-', '/');
          title = post.title;
          post_url = post.post_url;
          dataList.push({
            date: date,
            title: title,
            url: post_url
          });
        });
        renderData();
      }
    }

    function requestData() {
      $this.empty();
      if ($this.attr('id') === 'notify-latest') {
        tag = '&tag=お知らせ';
      } else if ($this.attr('id') === 'notify-closed') {
        tag = '&tag=お休み';
      }
      $.ajax({
        url: 'http://api.tumblr.com/v2/blog/' + url + '/posts?api_key=' + key + '&limit=2' + tag,
        dataType: 'JSONP',
        success: processResponse
      });
    }

    return this.each(function () {
      $this = $(this);
      requestData();
    });
  };
}(jQuery));
