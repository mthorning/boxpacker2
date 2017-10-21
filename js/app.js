define([
    'backbone',
    'marionette',
    'boxes',
    'boxView'
    ], function(Backbone, Marionette, BoxCollection, BoxView) {
    
    var MainLayout = Marionette.LayoutView.extend({
        template: _.template($('#app-tmpl').html()),
        el: '#appContainer',
        regions: {
            'boxList': '#boxListPanel'
        }
    });

    var app = {
        boxes: null,
        boxesView: null,
        itemsView: null,
        layout: null,
        start: function() {
            console.log("app starting...");
            this.layout = new MainLayout();
            this.layout.render();
            this.boxes = new BoxCollection();
            var self = this;
            this.boxes.fetch({
                reset: true,
                success: function(collection) {

                    //temp for testing
                    if(collection.length === 0) {
                        self.boxes.add([
                            {type: 'box', name: 'Kitchen'},
                            {type: 'box', name: 'Bathroom'},
                            {type: 'box', name: 'Bedroom'},
                            {type: 'box', name: 'Bedroom 2'},
                            {type: 'box', name: 'Porch'},
                        ])
                    }
                    //-----------

                    console.log('success: ', collection);
                    Backbone.history.start();
                    self.showBoxList(collection);
                },
                error: function(args) {
                    console.log('error fetching collection: ', args);
                }
            });
        },
        showBoxList: function(collection) {
            var boxView = new BoxView({ collection: collection })
            this.layout.boxList.show(boxView);
        }
    }
    
    return app;
});