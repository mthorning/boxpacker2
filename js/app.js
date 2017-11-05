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
                error: function(arguments) {
                    console.log("error: ", arguments);
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
            $('.addInputs').bind('keydown', function(e) {
                if(e.keyCode === 13) {
                    var boxInput = document.querySelector('#newBox');
                    var itemInput = document.querySelector('#newItem');
                    if(boxInput.value) {
                        var boxName = self.format(boxInput.value);
                        var boxes = new Backbone.Collection(self.collection
                            .where({ type: 'box' }));
                        if(boxes.pluck('name').indexOf(boxName) === -1) {
                            self.collection.addBox(boxName);                            
                        } else {
                            alert('A box of this name already exists.')
                        }
                        boxInput.value = '';
                        if(itemInput.value) {
                            self.addItem(itemInput);
                        }
                    } else if(itemInput.value) {
                        self.addItem(itemName);
                    }
                    $('#newItem').focus();
                }
            });     
            $('#searchInput').bind('input', function(e) {
                var searchValue = e.target.value.toLowerCase();
                self.itemView.triggerMethod('filter:input', searchValue);
                self.boxView.triggerMethod('filter:input', searchValue);
            });        
        },
        addItem: function(itemName) {
            this.collection.addItem(this.format(itemName.value));
            itemName.value = '';
        },
        format: function(input) {
            var output = [];
            var words = input.split(' ' );
            words.forEach(function(word) {
                var lowered = word.split('').map(function(letter) {
                    return letter.toLowerCase();
                });
                lowered.splice(0, 1, lowered[0].toUpperCase());
                output.push(lowered.join(''));
            });
            return output.join(' ');
        }
    });

    return app;
});