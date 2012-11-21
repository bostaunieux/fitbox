define([
    'jquery',
    'underscore',
    'backbone',
	'views/user_lift/entry',

	'tablesorter', 'tablesorter-widgets'
], function($, _, Backbone, UserLiftEntry) {

    return Backbone.View.extend({

        initialize: function() {
            _.bindAll(this, 'addAll', 'addOne');

			this.$table = this.$('table');

            this.collection.on('reset', this.addAll);
            this.collection.on('add', this.addOne);

        },

        addOne: function(entry) {
            this.$table.find('tbody').append(new UserLiftEntry({ model: entry }).render().el);
			this.$table.trigger('update');
        },

        addAll: function() {

            this.collection.each(this.addOne);

			// call the tablesorter plugin and apply the uitheme widget
			this.$table.tablesorter({

				sortList: [[0, 1]],
				// widget code contained in the jquery.tablesorter.widgets.js file
				// use the zebra stripe widget if you plan on hiding any rows (filter widget)
				widgets : [ "uitheme", "zebra" ],

				widgetOptions : {
					// using the default zebra striping class name, so it actually isn't included in the theme variable above
					// this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
					zebra : ["even", "odd"],

					// set the uitheme widget to use the bootstrap theme class names
					uitheme : "bootstrap"

				}
			});

			this.$table.trigger('update');
        }
	});
});

