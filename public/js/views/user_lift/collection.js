define([
    'jquery',
    'underscore',
    'backbone',
	'views/user_lift/entry'
], function($, _, Backbone, UserLiftEntry) {

    return Backbone.View.extend({

        initialize: function() {
            _.bindAll(this, 'addAll', 'addOne');

            this.collection.fetch();
            this.collection.on('reset', this.addAll);
            this.collection.on('add', this.addAll);
        },

        addOne: function(entry) {
            var liftName = entry.get('lift_category_name'),
                $container = this.$('.content [data-lift-name="' + liftName + '"]');

            if ($container.length === 0) {
                $container = $('<div />').attr('data-lift-name', liftName);
                $container.appendTo(this.$('.content'));
                $('<p />').text(liftName + 's').appendTo($container);
            }

            $container.append(new UserLiftEntry({ model: entry }).render().el);

        },

        addAll: function() {
            this.$('.content').html('');
            this.collection.each(this.addOne);

        }
    });
});

