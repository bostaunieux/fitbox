define([
    'jquery', 'underscore', 'backbone',
	'config',
	'collections/user_lift',
	'models/user_lift_filter'
], function($, _, Backbone, Config, UserLiftCollection, UserLiftFilter) {

	// TODO: save this state to a cookie
    return Backbone.View.extend({

		/**
		 * Model for user lift filters
		 * @var UserLiftFilter
		 */
		model: null,

		/**
		 * Collection of user lift entries
		 * @var UserLiftCollection
		 */
        collection: null,

		events: {
			'click .filter-item': 'onFilterItemClick',
			'click .sort-item': 'onSortItemClick'
		},

        initialize: function() {
			this.model.on('change', this.render, this);

			this.model.fetch();
			this.render();
        },

		onFilterItemClick: function(event) {
			event.preventDefault();
			$element = $(event.target);
			this.model.set({'filterBy': $element.data('fitboxFilter')});
			this.model.save();
		},

		onSortItemClick: function(event) {
			event.preventDefault();
			$element = $(event.target);
			this.model.set({'sortBy': $element.data('fitboxSort')});
			this.model.save();
		},

		render: function() {
			this.$('.filter-item, .sort-item').removeClass('active');
			this.$('[data-fitbox-filter="' + this.model.get('filterBy') + '"]').addClass('active');
			this.$('[data-fitbox-sort="' + this.model.get('sortBy') + '"]').addClass('active');
		}
    });
});


