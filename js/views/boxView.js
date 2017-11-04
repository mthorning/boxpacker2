define(['views/base', 'boxes'], function(Base, Boxes) {

    var Box = Base.Item.extend({
        triggers: {
            'click': 'box:click',
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.changeSelectionClass);
        },  
        changeSelectionClass: function() {
            if(this.model.get('selected')) {
                this.el.classList.add('selected');
            } else {
                this.el.classList.remove('selected');
            }
        },
        onBoxClick: function() {
            this.model.trigger('remove:selected');
            this.model.set({ selected: true });
        }
    });

    var BoxList = Base.List.extend({
        childView: Box,
        initialize: function() {
            this.listenTo(this.collection, 'remove:selected', this.removeSelected);
        },  
        filter: function(child) {
            return child.get('type') === 'box';
        },
        removeSelected: function() {    
            this.collection.filter(function(model) {
                return model.get('type') === 'box' && model.get('selected');
            }).forEach(function(model) {
                model.unset( 'selected', { silent: false });
            });
        }
    });

    return BoxList;

});