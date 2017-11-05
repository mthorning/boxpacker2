define(['backbone', 'views/base', 'boxes'], function(Backbone, Base, Boxes) {

    var Box = Base.Item.extend({
        triggers: {
            'click': 'box:click',
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.changeSelectionClass);
        },  
        onBeforeRender: function() {
            this.changeSelectionClass();
        },
        changeSelectionClass: function() {
            if(this.model.get('selected')) {
                this.el.classList.add('selected');
            } else if(this.el.classList.contains('selected')) {
                this.el.classList.remove('selected');
            }
        },
        onBoxClick: function() {
            this.model.trigger('remove:selected');
            this.model.set({ selected: true });
            $('#newItem').focus();
        }
    });

    var BoxList = Base.List.extend({
        childView: Box,
        filterText: '',
        initialize: function() {
            this.listenTo(this.collection, 'remove:selected', this.removeSelected);
        },  
        filter: function(model) {
            var self = this;
            return model.get('type') === 'box' &&
                (model.get('name')
                    .toLowerCase()
                    .indexOf(self.filterText) > -1 ||
            this.findFilteredContainers()
                .indexOf(model.get('name')) > -1);
        },
        findFilteredContainers: function() {
            var self = this;
            var boxes = this.collection.filter(function(model) {
                return model.get('type') === 'item' &&
                model.get('name')
                    .toLowerCase()
                    .indexOf(self.filterText) > -1;
            });
            return new Backbone.Collection(boxes).pluck('box');
        },      
        onFilterInput: function(searchText) {
            this.filterText = searchText;
            this.render();
        },
        removeSelected: function() {    
            this.collection.where({
                type: 'box',
                selected: true
            }).forEach(function(model) {
                model.unset( 'selected', { silent: false });
            });
        }
    });

    return BoxList;

});