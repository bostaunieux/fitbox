define([
    'jquery',
    'underscore',
    'backbone',
	'views/lift/user_lifts_list'
], function($, _, Backbone, UserLiftsView) {
	return Backbone.View.extend({

        /**
         * Lift model
         * @var Lift
         */
        model: null,

        /**
         * User lift collection
         * @var UserLiftCollection
         */
        collection: null,

		/**
		 * View representing user lift data for this lift
		 * @var UserLiftsView
		 */
		userLiftsView: null,

		tagName: 'li',

		className: 'lift span3',

		tpl: JST['templates/lift_list_item'],

		initialize: function() {
			_.bindAll(this, 'render');

			this.userLiftsView = new UserLiftsView({
				model: this.model,
				collection: this.collection,
				userLiftFilter: this.options.userLiftFilter
			});
		},

		events: {
		},

		render: function() {
			this.$el.prop('lift_id', this.model.getId());

			// TODO: overwrite toJSON in lift model?
			var templateData = this.model.toJSON();
			templateData['lift_url'] = this.model.getLiftURL();

			this.$el.html(this.tpl(templateData));
			this.$userLifts = this.$('[data-fitbox-role="user_lifts"]');
			this.$userLifts.append(this.userLiftsView.render().el);
			return this;
		}
	});
});

