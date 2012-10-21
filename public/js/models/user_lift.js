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
		return '/api/user/lift';	
	}

});
