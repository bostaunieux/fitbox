define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

	return Backbone.Model.extend({

		defaults: {
			'lift_id': 0,
			'user_id': 0,
			'weight': 0,
			'repetitions': 1,
			'date': Date.now()
		},

		urlRoot: '/api/user/lift',

		validate: function(attrs) {

		}

	});
});


