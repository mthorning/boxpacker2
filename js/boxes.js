define([
    'backbone', 
    'localStorage'
    ], function(Backbone, Store) {

    var BoxModel = Backbone.Model.extend();

    var BoxCollection = Backbone.Collection.extend({
        localStorage: new Store('boxes-backbone'),
        model: BoxModel
    });
    
    return BoxCollection;
});