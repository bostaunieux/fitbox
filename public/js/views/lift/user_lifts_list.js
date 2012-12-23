define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
	return Backbone.View.extend({

        /**
         * The lift by which these user lifts should be filtered
         * @var Lift
         */
        model: null,

        /**
         * User lift collection
         * @var UserLiftCollection
         */
        collection: null,

        /**
         * User lift filter model
         * @var UserLiftFilter
         */
        userLiftFilter: null,

		tagName: 'div',

		className: 'user-lift',

		tpl: JST['templates/user_lifts_list'],

		initialize: function() {
			this.userLiftFilter = this.options.userLiftFilter;

            this.userLiftFilter.on('change', this.render, this);

            this.render();
		},

		render: function() {
            // TODO: does getting highlighted lifts this way cause a race condition?
			var selected = null,
				models = this.collection.models,
				filterBy = parseInt(this.userLiftFilter.get('filterBy'), 10),
				sortBy = this.userLiftFilter.get('sortBy');

			if (filterBy > 0) {
			   models = _.filter(models, function(model) { return model.getRepetitions() == filterBy });
			}

			if (models.length > 0) {
				if (sortBy === 'newest') {
					selected = _.max(models, function(model) { return model.getDate(); });
				} else if (sortBy === 'heaviest') {
					selected = _.max(models, function(model) { return model.getWeight(); });
				}
			}

			if (selected) {
				this.$el.html(this.tpl({ userLifts: [selected] }));
			} else {
				this.$el.html('');
			}
			
			return this;
		}
	});
});

