define([
    'jquery',
    'underscore',
    'backbone',
	'views/user_lift/entry',
	'tablesorter'
], function($, _, Backbone, UserLiftEntry) {

    return Backbone.View.extend({

        initialize: function() {
            _.bindAll(this, 'addAll', 'addOne');

			this.$table = this.$('table');

            this.collection.fetch();
            this.collection.on('reset', this.addAll);
            this.collection.on('add', this.addAll);
        },

        addOne: function(entry) {
            this.$table.prepend(new UserLiftEntry({ model: entry }).render().el);
        },

        addAll: function() {
            this.$table.html(
				'<thead><th>Date</th><th>Reps</th><th>Weight</th></thead>'
				);
            this.collection.each(this.addOne);
			this.$table.tablesorter({
				// TODO: create own parser for storing in data attribute
				textExtraction: { 
					// for the date, ensure we're sorting on the timestamp
					0: function(node, table, cellIndex) { return $(node).find('span').text(); } 
			    } 
			});
        }
    });
});

