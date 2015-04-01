requirejs.config({
    baseUrl: "assets/js",

    paths:{
        backbone:"../../bower_components/backbone/backbone",
        "backbone.syphon":"../../bower_components/backbone.syphon/lib/backbone.syphon",
        jquery: "../../bower_components/jquery/dist/jquery",
        json2: "../../bower_components/json2/json2",
        marionette: "../../bower_components/marionette/lib/backbone.marionette",
        text: "vendor/text",
        tpl: "vendor/underscore-tpl",
        tooltip: "../../bower_components/bootstrap/js/tooltip",
        underscore: "../../bower_components/underscore/underscore"
    },

    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ["jquery", "underscore", "json2"],
            exports: "Backbone"
        },
        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        },
        tooltip:{
            deps: ["jquery"]
        },
        "jquery-ui":["jquery"],
        tpl: ["text"],
        "backbone.syphon":["backbone"]
    }
});

require(["app"], function(PhoneBookManager){
    PhoneBookManager.start();
});