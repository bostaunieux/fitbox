wod.Model.User = Backbone.Model.extend({

    defaults: {
		"id": null,
		"handle": null,
		"email": null
    },

	url: '/api/user'

});

