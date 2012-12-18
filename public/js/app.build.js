({
	mainConfigFile: './main.js',
    paths: {
        'jquery':      'vendor/jquery/jquery-1.8.3',
        'jquery-ui':   'vendor/jquery/jquery-ui-1.8.23.custom.min',
        'underscore':  'vendor/underscore/underscore-1.4.2',
        'backbone':    'vendor/backbone/backbone-0.9.2',
        'bootstrap':   'vendor/bootstrap/bootstrap',
        'tablesorter': 'vendor/jquery/jquery.tablesorter',
        'tablesorter-widgets': 'vendor/jquery/jquery.tablesorter.widgets',
        'domReady':    'vendor/require/domReady-2.0.1'
    },
    appDir: "../../",
    baseUrl: "public/js",
    dir: "../../../fenrir2-build",
    modules: [
		{
			name: "main",
			include: [ 'jquery', 'jquery-ui', 'underscore', 'backbone', 'domReady!', 'config' ]
	   	},
		{
			name: "pages/index",
			exclude: [ "main" ]
		},
		{
			name: "pages/lift",
			exclude: [ "main" ]
		},
		{
			name: "pages/prefs",
			exclude: [ "main" ]
		}
    ]
})
