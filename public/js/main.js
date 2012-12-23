require.config({
	baseUrl: '/js/',

    paths: {
        'jquery':      'vendor/jquery/jquery-1.8.3',
        'jquery-ui':   'vendor/jquery/jquery-ui-1.8.23.custom.min',
        'underscore':  'vendor/underscore/underscore-1.4.3',
        'backbone':    'vendor/backbone/backbone-0.9.9',
        'bootstrap':   'vendor/bootstrap/bootstrap',
        'tablesorter': 'vendor/jquery/jquery.tablesorter',
        'tablesorter-widgets': 'vendor/jquery/jquery.tablesorter.widgets',
        'domReady':    'vendor/require/domReady-2.0.1'
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            // These script dependencies should be loaded before loading
            // backbone.js
            deps: ['underscore', 'jquery'],

            // Once loaded, use the global 'Backbone' as the
            // module value.
            exports: 'Backbone'
        },
		'tablesorter-widgets': {
			deps: ['jquery', 'tablesorter']
		}
    }
});

require([
	'jquery',
	'jquery-ui',
	'underscore',
	'backbone',
    'models/user',
	'views/user/user_data',
	'bootstrap'
], function($, ui, _, Backbone, UserModel, UserData) {
    var userView = new UserData({ model: UserModel });

});

