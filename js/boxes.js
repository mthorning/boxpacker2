define([
    'backbone', 
    'localStorage'
    ], function(Backbone, Store) {

    var BoxModel = Backbone.Model.extend();

    var BoxCollection = Backbone.Collection.extend({
        url: 'assets/data.json',
        model: BoxModel,
        parse: function(data) {
            return data.inventory;
        }
    });
    
    return { BoxCollection, BoxModel };
});