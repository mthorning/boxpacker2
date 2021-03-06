define([
    'marionette',
    'localStorage'
    ], function(Marionette, LocalStorage) {

    var BoxModel = Backbone.Model.extend();

    var BoxCollection = Backbone.Collection.extend({
        model: BoxModel,
        localStorage: new LocalStorage('boxes'),
        addBox: function(name) {
            var box = new BoxModel({
                type: 'box',
                name: name,
                id: this.newId(),
            });
            this.trigger('remove:selected');
            this.add(box);
            box.save();
            box.set({ selected: true });
        },
        addItem:  function(name) {
            var box = this.findWhere({ selected: true }).get('name');
            if(box) {
                var item = new BoxModel({
                    type: 'item',
                    name: name,
                    id: this.newId(),
                    box: box
                });
                this.add(item);
                item.save();
            } else {
                alert('Please select a box to add the item to.');
            }
        },
        newId: function() {
            return this.length ? this.last().get('id') + 1 : 1;
        }
    });
    
    return BoxCollection;
});