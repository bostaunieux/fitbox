define([
    'jquery',
    'underscore',
    'backbone',
	'config'
], function($, _, Backbone, Config) {
    return Backbone.Model.extend({

		cookieName: 'user_lift_filter',

        defaults: {
            'sortBy': 'newest',
            'filterBy': 'all'
        },

        validate: function(attrs) {

        },

        writeToCookie: function() {
			Config.cookies.setItem(this.cookieName, JSON.stringify(this.toJSON()));
        },

        updateFromCookie: function() {
			var cookie = JSON.parse(Config.cookies.getItem(this.cookieName));
			if (cookie) {
				this.set({
					'sortBy': cookie.sortBy,
					'filterBy': cookie.filterBy
				});	
			}
        },

        /**
         * @override
         * Override the backbone sync method to interact w/ the cookie
         * rather than a restful service.
         */
		sync: function(method, model, options) {
			switch(method) {
				case "create":
				case "update":
					// save changes to cookie
					this.writeToCookie();
					break;
				case "read":
					// read cookie into model
					//  TODO: this bypasses the regular sync functionality
					//  possibly update to use options.sync
					this.updateFromCookie();
					break;
              }
        }
	});
});

