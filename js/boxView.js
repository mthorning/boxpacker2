define(['marionette'], function(Marionette) {

    var BoxItem = Backbone.Marionette.ItemView.extend({
        template: _.template($('#boxListItem-tmpl').html()),
        tagName: 'li',
        className: 'list-group-item'
    });

    var BoxList = Backbone.Marionette.CompositeView.extend({
        tagName: 'ul',
        className: 'list-group',
        childView: BoxItem
    });

    return BoxList;

});