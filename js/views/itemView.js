define(['views/base', 'boxes'], function(Base, Boxes) {

    var Item = Base.Item.extend();

    var ItemList = Base.List.extend({
        displayBox: null,
        childView: Item,
        filterText: '',
        filter: function(model) {
            return model.get('type') === 'item' && 
                model.get('box') === this.displayBox &&
                model.get('name')
                    .toLowerCase()
                    .indexOf(this.filterText) > -1;
        },
        onBeforeRender: function() {
            var selectedBox = this.collection.findWhere({ selected: true });
            if(selectedBox) {
                this.displayBox = selectedBox.get('name');
            } else {
                this.displayBox = null;
            }
        },
        onFilterInput: function(searchText) {
            this.filterText = searchText;
            this.render();
        }
    });

    return ItemList;
});