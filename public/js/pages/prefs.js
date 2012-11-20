define([
    'jquery', 'underscore', 'backbone', 
	'config',
	'views/user/update',
	'domReady!'
], function($, _, Backbone, Config, UpdateUserPrefsView) {

	$('.update-user-prefs').each(function(index, element) {
		new UpdateUserPrefsView({
			el: $(element)
		});
	});
});

