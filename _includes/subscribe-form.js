<script type="text/javascript">
function initSubscribeForm() {
  var subscribeForm = $('#customer-subscribe-form');
  subscribeForm.submit(function(event) {
    event.preventDefault();
    var submitBtn = $("#subscribe-form-submit-button");
    submitBtn.attr("disabled", true);
    $('#subscribe-form-failed-to-submit').addClass('form-hidden');

    var req = {
        email: $('#subscribe_email').val(),
    };

    submitBtn.addClass('form-hidden');
    $('#subscribe-form-loading-submit-button').removeClass('form-hidden');

    $.ajax({
        type: 'POST',
        url: subscribeForm.attr('action'),
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType: 'json',
        encode: true,
    }).done(function() {
      $('#subscribe-form-loading-submit-button').addClass('form-hidden');
      $('#subscribe-form-was-submitted').removeClass('form-hidden');
      subscribeForm.find('.form-group').addClass('form-hidden');
    }).fail(function(err) {
      $('#subscribe-form-loading-submit-button').addClass('form-hidden');
      $('#subscribe-form-failed-to-submit').removeClass('form-hidden');
      submitBtn.attr('disabled', false).removeClass('form-hidden');
    });
  });
}

$(document).ready(initSubscribeForm);

</script>
