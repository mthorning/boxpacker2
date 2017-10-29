define(['marionette', 'boxes'], function(Marionette, Boxes) {

    var Item = Marionette.ItemView.extend({
        template: _.template($('#listItem-tmpl').html()),
        tagName: 'li',
        className: 'list-group-item',
    });

    var ItemList = Marionette.CollectionView.extend({
        displayBox: null,
        childView: Item,
        tagName: 'ul',
        className: 'list-group',
        initialize: function() {
            this.listenTo(this.collection, 'change', this.render)
        },
        filter: function(model) {
            return model.get('type') === 'item' && model.get('box') === this.displayBox;
        },
        onBeforeRender: function() {
            var selectedBox = this.collection.findWhere({ selected: true });
            if(selectedBox) {
                this.displayBox = selectedBox.get('name');
            } else {
                this.displayBox = null;
            }
        }
    });

    return ItemList;
});