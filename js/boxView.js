define(['marionette', 'boxes'], function(Marionette, Boxes) {

    var Box = Marionette.ItemView.extend({
        template: _.template($('#listItem-tmpl').html()),
        tagName: 'li',
        className: 'list-group-item',
        events: {
            'click': 'onBoxClick'
        },
        onBoxClick: function() {
            this.model.trigger('remove:selected');
            this.model.set({ selected: true });
        }
    });

    var BoxList = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'list-group',
        childView: Box,
        initialize: function() {
            this.listenTo(this.collection, 'remove:selected', this.removeSelected)
        },  
        filter: function(child) {
            return child.get('type') === 'box';
        },
        removeSelected: function() {    
            this.collection.filter(function(model) {
                return model.get('type') === 'box' && model.get('selected');
            }).forEach(function(model) {
                model.set({ selected: false}, { silent: true });
            });
        }
    });

    return BoxList;

});