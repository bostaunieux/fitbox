wod.Model.Lift = Backbone.Model.extend({

    defaults: {
		'id': null,
		'name': null,
		'description': null,
        'lift_category_name': null,
		'user_lifts': []
    },

	urlRoot: '/api/lift',

	validate: function(attrs) {

	}

});

wod.Collection.Lifts = Backbone.Collection.extend({

	model: wod.Model.Lift,

	url: function() {
		return '/api/lift';	
	}

});
