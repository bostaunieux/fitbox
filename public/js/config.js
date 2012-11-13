define([
    'jquery', 'underscore', 'backbone', 'domReady!'
], function($, _, Backbone) {
    return {
		pageData: $('body').data('pageData')
	};
});
