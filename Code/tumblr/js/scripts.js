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
