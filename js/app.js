define([
    'marionette',
    'boxes',
    'boxView',
    ], function(Marionette, Boxes, BoxView) {
    
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
        boxCollection: null,
        boxView: null,
        start: function() {
            this.createCollections();
        },
        createCollections: function() {
            var self = this;
            this.collection = new Boxes.BoxCollection();
            this.collection.fetch({ 
                reset: true,
                success: function(coll) {
                    var boxes = self.collection.where({ type: 'box' });
                    self.boxCollection = new Boxes.BoxCollection(boxes);
                    console.log(self.boxCollection);
                    self.createLayout();
                    self.showBoxes();
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
        }
    });

    return app;
});