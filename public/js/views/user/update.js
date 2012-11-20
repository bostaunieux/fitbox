define([
    'jquery', 'underscore', 'backbone',
	'models/user'
], function($, _, Backbone, userModel) {

    return Backbone.View.extend({

        initialize: function() {
			this.$handle = this.$('[name="handle"]');

        },

        events: {
            'click [role="update"]' : 'onUpdate'
        },

        /**
         * Handle user clicking log-in
         */
        onUpdate: function(event) {
            event.preventDefault();
			userModel.set({'handle': this.$handle.val()});
			userModel.save();
        }
    });
});

