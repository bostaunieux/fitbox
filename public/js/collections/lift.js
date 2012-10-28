define([
    // These are path alias that we configured in our bootstrap
    'backbone',    // lib/backbone/backbone
	'models/lift'
], function(Backbone, Lift) {
    return Backbone.Collection.extend({

        model: Lift,

        url: function() {
            return '/api/lift';	
        }

    });
});

