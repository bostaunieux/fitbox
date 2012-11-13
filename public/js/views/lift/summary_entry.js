define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
	return Backbone.View.extend({

		tagName: 'li',

		className: 'lift span3',

		tpl: JST['templates/lift_summary'],

		initialize: function() {
			_.bindAll(this, 'render'/*, 'onEntryClick'*/);
		},

		events: {
//			'click': 'onEntryClick'
		},

		render: function() {
			$(this.el).attr('lift_id', this.model.get('id'));
			$(this.el).html(this.tpl(this.model.toJSON()));
			return this;
		},

/*
		onEntryClick: function(event) {
			event.preventDefault();
			window.location = '/lift/' + this.model.get('name').replace(' ', '-').toLowerCase() + '/' + this.model.get('id'); 
		}
*/
	});
});

