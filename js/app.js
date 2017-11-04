define([
    'marionette',
    'boxes',
    'views/boxView',
    'views/itemView'
    ], function(Marionette, Boxes, BoxView, ItemView) {
    
    var MainLayout = Backbone.Marionette.LayoutView.extend({
        template: _.template($('#app-tmpl').html()),
        el: '#appContainer',
        regions: {
            'inputs': '#inputs',
            'boxList': '#boxListPanel',
            'itemList': '#itemListPanel'
        }
    });

    var app = new Backbone.Marionette.Application({
        layout: null,
        collection: null,
        boxView: null,
        itemView: null,
        start: function() {
            this.createCollections();
        },
        createCollections: function() {
            var self = this;
            this.collection = new Boxes();
            this.collection.fetch({ 
                reset: true,
                success: function(coll) {
                    self.createLayout();
                    self.showBoxes();
                    self.setEventListeners();
                },
                error: function(arg) {
                    console.log("error: ", arg);
                } 
            });
        },
        createLayout: function() {
            this.layout = new MainLayout();
            this.layout.render();
        },
        showBoxes: function() {
            this.boxView = new BoxView({ collection: this.collection });
            this.layout.boxList.show(this.boxView);
            this.itemView = new ItemView({ collection: this.collection });
            this.layout.itemList.show(this.itemView)
        },
        setEventListeners: function() {
            var self = this;
            document.getElementById('inputs').addEventListener('input', function(e) {
                if(e.target.id === 'search') {
                    var searchTerm = e.target.value.toLowerCase();
                    var matchedItems = self.collection.filter(function(model) {
                        return model.get('name').toLowerCase().indexOf(searchTerm) > -1;
                    });
                    console.log(matchedItems);
                } else {
                    if(e.keyCode === 13) {
                        var boxName = document.querySelector('#newBox');
                        var itemName = document.querySelector('#newItem');
                        if(boxName.value) {
                            self.collection.addBox(boxName.value);
                            boxName.value = '';
                            if(itemName.value) {
                                self.addItem(itemName);
                            }
                        } else if(itemName.value) {
                            self.addItem(itemName);
                        }
    
                    }
                }

            });                
        },
        addItem: function(itemName) {
            console.log(itemName);
            this.collection.addItem(itemName.value);
            itemName.value = '';
        }
    });

    return app;
});