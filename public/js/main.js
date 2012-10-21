window.wod = {
    Collection: {},
	Model: {},
	View: {}
};

wod.View.App = Backbone.View.extend({
	/**
	 * User model
	 */
	userModel: null,

	initialize: function() {
		// initialize the models
		this.userModel = new wod.Model.User();
        this.userView = new wod.View.User({ model: this.userModel });

		var liftCollection = new wod.Collection.Lifts();
		var userLiftCollection = new wod.Collection.UserLifts();
		$('.lift-list').each(function(index, element) {

			new wod.View.LiftsSummary({
				el: $(element),
				collection: liftCollection,
				userLiftCollection: userLiftCollection
			});	
		});

		$('.add-user-lift').each(function(index, element) {

			new wod.View.AddUserLift({
				el: $(element),
				collection: userLiftCollection
			});
		});

		$('.user-lift-list').each(function(index, element) {

			new wod.View.UserLifts({
				el: $(element),
				collection: userLiftCollection
			});
		});
	}
});

$(function() {
    wod.app = new wod.View.App({ el: $('body') });
});

