wod.View.LiftSummary = Backbone.View.extend({

	tagName: 'div',

    className: 'lift',

    tpl: JST['templates/lift_summary'],

    initialize: function() {
		_.bindAll(this, 'render');
    },

	render: function() {
        $(this.el).attr('lift_id', this.model.get('id'));
		$(this.el).html(this.tpl(this.model.toJSON()));
		return this;
	}
});

wod.View.LiftsSummary = Backbone.View.extend({

	userLiftCollection: null,

    initialize: function() {
		_.bindAll(this, 'addAll', 'addOne');

        this.collection.fetch();
        this.collection.on('reset', this.addAll);

		this.userLiftCollection = this.options.userLiftCollection;
		this.userLiftCollection.fetch();
    },

    addOne: function(entry) {
		var userLifts = this.userLiftCollection.filter(function(userLift) {
			return userLift.get('lift_id') === entry.get('id');
		});

		entry.set('user_lifts', userLifts);

        var liftName = entry.get('lift_category_name'),
            $liftGroup = this.$('.content [data-lift-name="' + liftName + '"]');

        if ($liftGroup.length === 0) {
            $liftGroup = $('<div />').attr({
				'data-lift-name': liftName,
				'class': 'lift-group'
			});
			$liftGroup.append($('<h3 />').text(liftName + 's'));
			$liftGroup.append($('<div />', { 'class': 'lifts' }));

            $liftGroup.appendTo(this.$('.content'));
        }
		var $lift = new wod.View.LiftSummary({ model: entry });
        $liftGroup.find('div.lifts').append($lift.render().el);
    },

    addAll: function() {
        this.$('.content').html('');
		this.collection.each(this.addOne);
    }
});

