define(['marionette'], function(Marionette) {

    var Item = Marionette.ItemView.extend({
        template: _.template($('#listItem-tmpl').html()),
        tagName: 'li',
        className: 'list-group-item',
        events: {
            'click #closeButton': 'deleteItem',
        },
        deleteItem: function() {
            var target = this.model;
            if(target.get('type') === 'box') {
                target.collection.where({ type: 'item' }).forEach(function(model) {
                    if(model.get('box') === target.get('name')) {
                        model.destroy();
                    }
                });
            } 
            target.destroy();
        }
    });

    var List = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'list-group',
        initialize: function() {
            this.listenTo(this.collection, 'change', this.render);
        }
    });

    return { Item, List }
});