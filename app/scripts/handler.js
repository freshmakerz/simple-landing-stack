(function($){
  
  $(function(){
    
    var landing = $.landing;

    // launch core
    $.core.init(landing);

    var landingForm    = $('#landingForm'),
        recallForm     = $('#recallForm'),
        textInputs     = $('input[type="text"].set-input, textarea'),
        radioInputs    = $('input[type="radio"]'),
        checkboxInputs = $('input[type="checkbox"]');
    
    // Submit landing form
    landingForm.on('submit', function() {
      if($.core.submitForm(false)) {
        return true;
      }else {
        return false;
      }
    });
    
    // Submit recall form
    recallForm.on('submit', function(event) {
      event.preventDefault();
      /* BUG
      if($.core.submitForm(false)) {
        return true;
      }else {
        return false;
      }
      */
    });
    
    // set var on text input blur event
    textInputs.on('blur', function() {
      var input = $(this).attr('id'),
          value = $(this).val();
      $.core.setInputText(input, value);
    });
    
    radioInputs.change(function() {
      $.core.setInputText(this.name, this.value);
    });
    
    checkboxInputs.click(function() {
      $.core.setInputArray(this.name, this.value);
    });
    
    // Save scroll posistion
    if(landing.saveScrollPosition === true)
    {
      if($.cookie(landing.saveScrollCookieName) !== null ) {
        $(document).scrollTop( $.cookie(landing.saveScrollCookieName) );
      }
      $(window).on('scroll', function() {
        $.core.saveScrollPosition($(document).scrollTop());
      });
    }

  });
})(jQuery);
