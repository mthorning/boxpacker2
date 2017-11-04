define(['marionette'], function(Marionette) {

    var Item = Marionette.ItemView.extend({
        template: _.template($('#listItem-tmpl').html()),
        tagName: 'li',
        className: 'list-group-item',
        events: {
            'click #closeButton': 'deleteItem'
        },
        deleteItem: function() {
            this.model.collection.remove(this.model);
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