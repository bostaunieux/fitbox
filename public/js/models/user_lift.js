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
			'date': Date.now(),
			'notes': ''
		},

		urlRoot: '/api/user/lift',

		validate: function(attrs) {

		},

        getLiftId: function() {
            return this.get('lift_id');
        },

        getUserId: function() {
            return this.get('user_id');
        },

        getWeight: function() {
            return this.get('weight');
        },

        getRepetitions: function() {
            return this.get('repetitions');
        },

        getDate: function() {
            return this.get('date');
        },

        getNotes: function() {
            return this.get('notes');
        }

	});
});


