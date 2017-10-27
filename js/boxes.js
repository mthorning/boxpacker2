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
        },
        addBox: function(name) {
            var box = new BoxModel({
                type: 'box',
                name: name,
                id: this.newId()
            });
            this.add(box);
        },
        newId: function() {
            return this.length ? this.last().get('id') + 1 : 1;
        }
    });
    
    return BoxCollection;
});