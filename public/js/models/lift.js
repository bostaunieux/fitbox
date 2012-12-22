define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    return Backbone.Model.extend({

        defaults: {
            'id': null,
            'name': null,
            'description': null,
            'lift_category_name': null,
            'user_lifts': []
        },

        urlRoot: '/api/lift',

        validate: function(attrs) {

        },

        getId: function() {
            return this.get('id');
        },

        getName: function() {
            return this.get('name');
        },

        getDescription: function() {
            return this.get('description');
        },

        getLiftCategoryName: function() {
            return this.get('lift_category_name');
        },

		getLiftURL: function() {
			return '/lift/' + this.getName().replace(' ', '-').toLowerCase() + '/' + this.getId()
		}
    });
});

