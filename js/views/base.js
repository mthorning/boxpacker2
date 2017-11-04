define(['marionette'], function(Marionette) {

    var Item = Marionette.ItemView.extend({
        template: _.template($('#listItem-tmpl').html()),
        tagName: 'li',
        className: 'list-group-item',
        events: {
            'click #closeButton': 'deleteItem',
            'mouseover .fa-remove': 'onMouseOver',
            'mouseout .fa-remove': 'onMouseOut'

        },
        deleteItem: function() {
            this.model.collection.remove(this.model);
        },
        onMouseOver: function(e) {
            this.$('.fa-remove').fadeIn();
        },
        onMouseOut: function() {
            this.$('.fa-remove').fadeOut();
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