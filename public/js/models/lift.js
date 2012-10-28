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

        }

    });
});

