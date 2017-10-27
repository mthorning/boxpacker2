define(['marionette', 'boxes'], function(Marionette, Boxes) {

    var Item = Marionette.ItemView.extend({
        template: _.template($('#listItem-tmpl').html()),
        tagName: 'li',
        className: 'list-group-item',
    });

    var ItemList = Marionette.CollectionView.extend({
        childView: Item,
        tagName: 'ul',
        className: 'list-group',
        filter: function(model) {
            return model.get('type') === 'item';
        }
    });

    return ItemList;
});