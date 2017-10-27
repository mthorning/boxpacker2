define([
    'marionette',
    'boxes',
    'boxView',
    'itemView'
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
            document.getElementById('inputs').addEventListener('keydown', function(e) {
                if(e.keyCode === 13) {
                    var boxName = document.querySelector('#newBox').value;
                    if(boxName) {
                        self.collection.addBox(boxName);
                        //clear inputs
                    }
                }

            });                
        }
    });

    return app;
});