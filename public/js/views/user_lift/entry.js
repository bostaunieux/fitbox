define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    return Backbone.View.extend({

        tagName: 'tr',

        className: 'user-lift',

        tpl: JST['templates/user_lift'],

        initialize: function() {
            _.bindAll(this, 'render');
        },

        render: function() {
            $(this.el).data('user_lift_id', this.model.get('id'));
            $(this.el).html(this.tpl(this.model.toJSON()));
            return this;
        }
    });
});

