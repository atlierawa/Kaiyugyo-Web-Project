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
  $.fn.tagListGen = function () {
    var $this = null,
      titles = [],
      titlesList = [],
      post_urls = [],
      post_urlsList = [],
      url = 'atsushioho.tumblr.com',
      key = 'IXFjOnZNoyT1rq6jbXMrh5ILAfEvtS7ajQwnJ1dzkJqpJWG0MW';
      latest = '&tag=お休み';
      closed = '&tag=お休み';

    function renderData() {
      $this.empty();
      $.each(titlesList, function (idx, t) {
        $this.append(
          $('<a>').attr({
            'href': ,
            'title': t.original
          })
            .html('#' + t.original + '&nbsp;&nbsp;&nbsp;')
        );
      });
    }

    function processResponse(data) {
      var i;
      $this.empty();
      $.each(data.response.posts, function (idx, post) {
        if (post.title && post.title.length) {
          for (i = 0; i < 2; i++) {
            titles = post.title[i];
            post_urls = post.post_url[i];
            titlesList.push({
              count: 1,
              original: post.title[i]
            });
            post_urlsList.push({
              count: 1,
              original: post.urls[i]
            });
          }
        }
      });
      renderData();
    }

    function requestData() {
      $.ajax({
        url: 'http://api.tumblr.com/v2/blog/' + url + '/posts?api_key=' + key + latest,
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
