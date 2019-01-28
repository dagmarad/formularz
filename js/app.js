var ContactForm = {
    $form: $('.form'),
    $formSubmit : $('.form__submit'),
    send: function() {
      ContactForm.$formSubmit.attr("disabled", "disabled");
      var formData = ContactForm.$form.serialize();
      $.ajax({
        type: 'POST',
        url: ContactForm.$form.attr('action'),
        data: formData
      })
      .done(function(response) {
        ContactMessage.add('Zgłoszenie przyjęte.', 'message--success');
        ContactForm.$formSubmit.removeAttr("disabled");
        ContactForm.clearData();
      })
      .fail(function(response) {
        ContactMessage.add('Wystąpił błąd, spróbuj ponownie.', 'message--error')
        ContactForm.$formSubmit.removeAttr("disabled");
        if (typeof response.errorText !== "undefined") {
          console.log(response.errorText);
        } else {
          console.log('Nie udało się połączyć z serwerem.');
        }
      });
    },
    clearData: function() {
      $('#name, #email, #number, #education, #hobby').val('')
      $('#sex-female, #sex-male, #legal-action').prop('checked', false);
    },
    assign: function() {
      ContactForm.$form.submit(function(event) {
        event.preventDefault();
        ContactForm.send();
      });
    },
    init: function() {
      ContactForm.assign();
    }
  };
  var ContactMessage = {
    $formMessage: $('.message'),
    add: function(messageText, newClass){
      ContactMessage.$formMessage.removeClass('message--error message--success')
        .addClass(newClass)
        .show()
        .text(messageText);
      setTimeout(function(){
        ContactMessage.$formMessage.removeClass('message--error message--success');
      }, 2000);
    }
  };

ContactForm.init();
