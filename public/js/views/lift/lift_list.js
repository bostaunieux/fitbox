define([
    'jquery', 'underscore', 'backbone',
	'config',
	'collections/user_lift',
	'views/lift/lift_list_item'
], function($, _, Backbone, Config, UserLiftCollection, LiftListItemView) {

    return Backbone.View.extend({

		/**
		 * Collection of lift types
		 * @var LiftCollection
		 */
		collection: null,

		/**
		 * Collection of user lift entries
		 * @var UserLiftCollection
		 */
        userLiftCollection: null,

		/**
		 * Model for user lift filtering
		 * @var UserLiftFilter
		 */
        userLiftFilter: null,

        initialize: function() {
            _.bindAll(this, 'addAll', 'addOne');

            this.collection.on('reset', this.addAll);

            this.userLiftCollection = this.options.userLiftCollection;
            this.userLiftFilter = this.options.userLiftFilter;

			this.$mainContent = this.$('.content');

			if (Config.pageData['lifts']) {
				this.collection.reset(Config.pageData['lifts']);
			} else {
				this.collection.fetch();
			}
        },

        addOne: function(lift) {
            var liftName = lift.getLiftCategoryName(),
                $liftGroup = this.$mainContent.find('[data-lift-name="' + liftName + '"]');

            if ($liftGroup.length === 0) {
                $liftGroup = $('<div />').attr({
                    'data-lift-name': liftName,
                    'class': 'lift-group row'
                });
                $liftGroup.append($('<h3 />').text(liftName + 's'));
                $liftGroup.append($('<div />', { 'class': 'lifts' }));

                $liftGroup.appendTo(this.$mainContent);
            }

            var liftView = new LiftListItemView({
				model: lift,
				collection: new UserLiftCollection(this.userLiftCollection.where({'lift_id': lift.getId()})),
				userLiftFilter: this.userLiftFilter
			});
            $liftGroup.find('div.lifts').append(liftView.render().el);
        },

        addAll: function() {
            this.$mainContent.html('');
            this.collection.each(this.addOne);
        }
    });
});


