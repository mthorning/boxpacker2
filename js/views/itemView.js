define(['views/base', 'boxes'], function(Base, Boxes) {

    var Item = Base.Item.extend();

    var ItemList = Base.List.extend({
        displayBox: null,
        childView: Item,
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