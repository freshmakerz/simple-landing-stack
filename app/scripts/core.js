var landing = $.landing;

$.core = {
  
  // init the landing
  init: function(){
    // this.debug(landing);
    this.detectEnv();
    this.detectOrigine();
  },
  
  // Detect env (DEV || PROD)
  detectEnv: function(){
    if(landing.devUrl === window.location.origin){
      landing.env = 'DEV';
    }else{
      landing.env = 'PROD';
    }
  },
  
  // Detect origin query param
  detectOrigine: function(){
    if(landing.detectOrigine === true){
      var url = $.url();
      if(url.param(landing.origineTag)){
        landing.origine = url.param(landing.origineTag);
      }
    }
  },
  
  // Save scroll postion
  saveScrollPosition: function(value){
    $.cookie(landing.saveScrollCookieName, value);
  },
  
  // Set input text value on blur event
  setInputText: function(input, value){
    landing.fields[input].value = value;
  },
  
  // Set input [] on change event
  addInputToArray: function(input, value){
    var index = $.inArray( value, landing.fields[input].value);
    if(index < 0){
      landing.fields[input].value.push(value);
    }
  },
  
  // Set input [] on change event
  removeInputFromArray: function(input, value){
    var index = $.inArray( value, landing.fields[input].value);
    if(index > -1){
      landing.fields[input].value.splice(index, 1);
    }
  },
  
  // Validate a field
  validateForm: function(fields){
    var isFormValid = true;
    $.each(fields, function(k,v){
      var isValidField = $.validator.validateField(v);
      if(isValidField === false){
        isFormValid = false;
      }
    });
    return isFormValid;
  },
  
  // submit the form
  submitForm: function(){
    if(this.validateForm(landing.fields) === true){
      if(landing.submitType === 'AJAX'){
        this.reqBackend();
      }else{
        return true;
      }
    }else{
      this.centerForm();
    }
  },
  
  // Req the backend
  reqBackend: function(){
    var $btn = $('#landingForm').find('button');
    $btn.button('loading');
    $.ajax({
      url: landing.submitUrl[landing.env],
      type: 'POST',
      data: $('#landingForm').serialize()+'&'+$.param({ 'env': landing.env })+'&'+$.param({ 'origine': landing.origine }),
      dataType: 'json',
    })
    .done(function(){
      console.log('Done!');
      $.core.reqCallback();
    })
    .fail(function(){
      console.log('Fail!');
    })
    .always(function(){
      $btn.button('reset');
    });
  },
  
  // Submit form callback
  reqCallback: function(){
    if(landing.callback === 'redirect'){
      $(location).attr('href', landing.redirectUrl);
    }else if(landing.callback === 'popup'){
      this.confirmPopup();
    }else if(landing.callback === 'alertAndHideForm'){
      
    }
    if(landing.trackFormSuccess){
      this.changeAnalyticTag();
    }
    //this.clearForm();
  },
  
  // Change GA tag for main form
  changeAnalyticTag: function(){
    console.log('Add tracking for success form');
    window.google_trackConversion(landing.trackingGaData);
  },
  
  // Recenter form if errors
  centerForm: function(){
    $('html, body').animate({
        scrollTop: $('#landingForm').offset().top
    }, 200);
  },
  
  // Clear the landing form
  clearForm: function(){
    $('#landingForm input, #landingForm textarea').each(function() {
      if($(this).attr('type') === 'radio'){
        if($(this).attr('checked')){
          if(landing.fields[$(this).attr('name')].value !== landing.fields[$(this).attr('name')].defaultValue){
            $(this).iCheck('uncheck');
            landing.fields[$(this).attr('name')].value = landing.fields[$(this).attr('name')].defaultValue;
          }
        }else{
          if(landing.fields[$(this).attr('name')].value !== landing.fields[$(this).attr('name')].defaultValue){
            $(this).iCheck('check');
            landing.fields[$(this).attr('name')].value = landing.fields[$(this).attr('name')].defaultValue;
          }
        }
      }else if($(this).attr('type') === 'checkbox'){
        // uncheck all
        $(landing.fields[$(this).attr('name')].element).iCheck('uncheck');
      }else{
        // Do not clear Hidden fields
        if( $(this).attr('type') !== 'hidden'){
          $(this).val('');
          landing.fields[$(this).attr('id')].value = null;
        }
      }
    });
  },
  
  // Confirm popup
  confirmPopup: function(){
    $('#myModal .modal-body').html('<p>Nous avons bien pris en compte votre demande et vous recontacterons dans les plus brefs délais.</p>');
    $('#myModal').modal('show');
  },
  
  // Req has error
  reqError: function(){

  },
  
  // Debug the landing (@param)
  debug: function(value){
    console.log(value);
  }
  
};