/*
* Define landing
*/

$.landing = {
  // landing type (dynamic/single)
  type: 'simple',
  // env (dev/prod)
  env: null,
  // dev env url
  devUrl: 'http://soferim-les-jardins-bonaparte-freshmakerz.c9.io',
  // Form submit type (ajax/curl/inherit)
  submitType: 'AJAX',
  // Form submint url (depend of env)
  submitUrl: {
    DEV: '../app/fwk/handler.php',
    PROD: '../fwk/handler.php'
  },
  // Save scroll position (true/false)
  saveScrollPosition: true,
  // Name of the saving scroll position cookie ("string")
  saveScrollCookieName: 'SoferimScrollPosition',
  // Submit form type (post/get)
  submitUrlType: 'POST',
  // detect origine (true/false)
  detectOrigine: true,
  // origine name
  origineTag: 'utm_source',
  // origine value (null)
  origine: null,
  // Tracking form success
  trackFormSuccess: true,
  // Tracking ga value
  trackingGaData: {
    /*
    google_conversion_id: 945554610,
    google_conversion_language: 'en',
    google_conversion_format: '3',
    google_conversion_color: 'ffffff',
    google_conversion_label: 'v4xoCLXJo1sQsonwwgM',
    google_remarketing_only: false
    */
  },
  // Success form callback (popup/redirect/hide)
  callback: 'popup',
  // Success form callback redirect url
  redirectUrl: '',
  //Landing fields
  fields: {
    civilite: {
      element: 'input[name="civilite"]',
      name: 'Civilité',
      value: 'Mme',
      defaultValue: 'Mme',
      type: 'radio',
      validations: [

      ]
    },
    nom: {
      element: '#nom',
      name: 'Nom',
      value: null,
      defaultValue: null,
      type: 'text',
      validations: [
        'required',
        'regex|alpha',
        'max|100'
      ]
    },
    prenom: {
      element: '#prenom',
      name: 'Prénom',
      value: null,
      defaultValue: null,
      type: 'text',
      validations: [
        'required',
        'regex|alpha',
        'max|50'
      ]
    },
    email: {
      element: '#email',
      name: 'Email',
      value: null,
      defaultValue: null,
      type: 'text',
      validations: [
        'required',
        'regex|mail',
        'max|250'
      ]
    },
    telephone: {
      element: '#telephone',
      name: 'Téléphone',
      value: 'oui',
      defaultValue: null,
      type: 'text',
      validations: [
        'required',
        'regex|tel',
        'max|25'
      ]
    },
    cp: {
      element: '#cp',
      name: 'Code postal',
      value: null,
      defaultValue: null,
      type: 'text',
      validations: [
        'required',
        'regex|cp'
      ]
    },
    'projet[]': {
      element: 'input[name="projet[]"]',
      name: 'Projet',
      value: [],
      defaultValue: 'investir',
      type: 'checkbox',
      validations: [
        'requiredArray'
      ]
    }
  },
  // Landing errors displaying
  errors: {
    displayMsg: true,
    borderColor: true,
    displayTootltip: true
  },
  // Landing plugins
  plugins: {
    // Jquery Icheck (inputs styling)
    icheck: {
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green',
    },
    // Jquery placeholder (for IE placeholder fix)
    placeholder: {},
    // Jquery BxSlider (landing slider)
    bxslider: {
      pager: false
    }
  }
};