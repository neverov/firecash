require.config({
  paths: {
    'jquery': '/bower_components/jquery/jquery.min',
    'bootstrap': '/bower_components/bootstrap/dist/js/bootstrap.min',
    'underscore': '/bower_components/underscore/underscore-min',
    'firebase': '/bower_components/firebase/firebase',
    'firebase-simple-login': '/bower_components/firebase-simple-login/firebase-simple-login',
    'react': '/bower_components/react/react-with-addons.min',
    'text': '/bower_components/requirejs-text/text',
    'director': '/bower_components/director/build/director.min',
    'jsx': 'lib/jsx', //'https://raw.github.com/philix/jsx-requirejs-plugin/master/js/jsx',
    'JSXTransformer': 'lib/JSXTransformer-0.8.0', //'https://raw.github.com/philix/jsx-requirejs-plugin/master/js/JSXTransformer-0.8.0'
    'moment': '/bower_components/momentjs/min/moment.min'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'firebase': {
      exports: 'Firebase'
    },
    'firebase-simple-login': {
      deps: ['firebase'],
      exports: 'FirebaseSimpleLogin'
    },
    'react': {
      exports: 'React'
    },
    'director': {
      exports: 'Router'
    }
  }
});

define(['firebase', 'react', 'global', 'jsx!src/app', 'bootstrap'], function(Firebase, React, Global, App, Bootstrap) {
  console.log('app started at: ' + new Date());

  var firebase = new Firebase(Global.firebaseUri);
  React.renderComponent(App({ firebase: firebase}), document.getElementById('app'));
});
