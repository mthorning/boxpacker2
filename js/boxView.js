define(['marionette'], function(Marionette) {

    var BoxItem = Backbone.Marionette.ItemView.extend({
        template: _.template($('#boxListItem-tmpl').html()),
        tagName: 'li',
        className: 'list-group-item',
        initialize: function() {
            this.$el.attr('data-id', this.model.get('id'));
        }
    });

    var BoxList = Backbone.Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'list-group',
        childView: BoxItem
    });

    return BoxList;

});