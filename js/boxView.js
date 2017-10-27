define(['marionette', 'boxes'], function(Marionette, Boxes) {

    var Box = Marionette.ItemView.extend({
        template: _.template($('#listItem-tmpl').html()),
        tagName: 'li',
        className: 'list-group-item',
    });

    var BoxList = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'list-group',
        childView: Box,
        filter: function(child) {
            return child.get('type') === 'box';
        }
    });

    return BoxList;

});