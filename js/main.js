
require.config({
    baseUrl: "js",
    paths: {
        'localStorage': '../bower_components/backbone.localStorage/backbone.localStorage',
        'jquery': '../bower_components/jquery/dist/jquery',
        'underscore': '../bower_components/underscore/underscore',
        'radio': '../bower_components/backbone.radio/build/backbone.radio',
        'marionette': '../bower_components/backbone.marionette/lib/backbone.marionette',
        'backbone': '../bower_components/backbone/backbone',
        'backbone-forms': '../bower_components/backbone-forms/distribution.amd/backbone-forms'
    },
    shim: {
        'marionette': {
            deps: ['backbone' ],
            exports: 'Marionette'   
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'localStorage': {
            deps: ['backbone'],
        },
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        }
    }
});

require(["app"], function(app) {
    app.start();
});