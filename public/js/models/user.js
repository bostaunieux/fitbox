define(['backbone'], function(Backbone) {

    var UserModel = Backbone.Model.extend({

        defaults: {
            "id": null,
            "handle": null,
            "email": null
        },

        url: '/api/user'

    });

	return new UserModel();
});

