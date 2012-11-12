define(['backbone'], function(Backbone) {

    var UserModel = Backbone.Model.extend({

        defaults: {
            "id": null,
            "handle": null,
            "email": null
        },

        url: '/api/user',

		exists: function() {
			return this.get('id') != null;
		}

    });

	return new UserModel();
});

