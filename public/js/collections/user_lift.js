define([
    'jquery',
    'underscore',
    'backbone',
	'models/user_lift'
], function($, _, Backbone, UserLift) {
    return Backbone.Collection.extend({

        model: UserLift,

        url: function() {
            var apiUrl = '/api/user/lift';

            if (this.isSummaryOnly) {
                apiUrl += '?summary=1';
            }

            return apiUrl;
        },

        isSummaryOnly: false,

        setSummaryOnly: function(summaryOnly) {
            this.isSummaryOnly = summaryOnly;
        }

    });
});
