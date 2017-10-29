define(['marionette'], function(Marionette) {

    var Item = Marionette.ItemView.extend({
        template: _.template($('#listItem-tmpl').html()),
        tagName: 'li',
        className: 'list-group-item',
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