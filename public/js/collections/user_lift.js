define([
    'jquery',
    'underscore',
    'backbone',
	'models/user_lift'
], function($, _, Backbone, UserLift) {
    return Backbone.Collection.extend({

        model: UserLift,

        url: function() {
            var apiUrl = '/api/user/lift',
				params = {};

            if (this.filterByLift) {
                params['lift_id'] = this.filterByLift;
            }

			if (_.size(params) > 0) {
				apiUrl += '?' + $.param(params);
			}

            return apiUrl;
        },

        isSummaryOnly: false,

        filterByLift: null,

        setSummaryOnly: function(summaryOnly) {
            this.isSummaryOnly = summaryOnly;
        },

        setFilterByLift: function(liftId) {
            this.filterByLift = liftId;
        }

    });
});

