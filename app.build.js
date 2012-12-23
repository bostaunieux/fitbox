({
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
	/**
	 * Base directory for app
	 */
    appDir: ".",
	/**
	 * Directory containing js modules relative to appDir
	 */
    baseUrl: "public/js",
	/**
	 * Main configuration file for require.js relative to appDir
	 */
	mainConfigFile: 'public/js/main.js',
	/**
	 * Output directory for build
	 */
    dir: "../build-fitbox",
	/**
	 * List of modules to optimize
	 */
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
