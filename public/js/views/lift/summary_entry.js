define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
	return Backbone.View.extend({

		tagName: 'div',

		className: 'lift',

		tpl: JST['templates/lift_summary'],

		initialize: function() {
			_.bindAll(this, 'render', 'onEntryClick');
		},

		events: {
			'click': 'onEntryClick'
		},

		render: function() {
			$(this.el).attr('lift_id', this.model.get('id'));
			$(this.el).html(this.tpl(this.model.toJSON()));
			return this;
		},

		onEntryClick: function(event) {
			window.location = '/member/lift/' + this.model.get('id'); 
		}
	});
});

