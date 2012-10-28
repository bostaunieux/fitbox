wod.Model.UserLift = Backbone.Model.extend({

    defaults: {
		'lift_id': 0,
		'user_id': 0,
		'weight': 0,
        'repetitions': 1,
		'date': Date.now()
    },

	urlRoot: '/api/user/lift',

	validate: function(attrs) {

	}

});

wod.Collection.UserLifts = Backbone.Collection.extend({

	model: wod.Model.UserLift,

	url: function() {
		var apiUrl = '/api/user/lift';

		if (this.isSummary) {
			apiUrl += '?summary=1';
		}

		return apiUrl;
	},

	isSummary: false,

	setSummary: function(summary) {
		this.isSummary = summary;
	}

});
