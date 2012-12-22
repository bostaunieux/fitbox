define([
    'jquery', 'underscore', 'backbone',
	'config',
	'models/user',
	'collections/lift',
	'collections/user_lift',
	'models/user_lift_filter',
	'views/lift/lift_list',
	'views/lift/lift_list_filter',
	'domReady!'
], function($, _, Backbone, Config,
	userModel, LiftCollection, UserLiftCollection, UserLiftFilter,
	LiftListView, LiftListFilterView) {

    if (!userModel.exists()) {
        return; 
    }

	var liftCollection = new LiftCollection();
	var userLiftCollection = new UserLiftCollection();
	var userLiftFilter = new UserLiftFilter();
    if (Config.pageData['userLifts']) {
        userLiftCollection.reset(Config.pageData['userLifts']);
    } else {
        userLiftCollection.fetch();
    }

	$('.lift-summary-list').each(function(index, element) {
		new LiftListView({
			el: $(element),
			userLiftFilter: userLiftFilter,
			collection: liftCollection,
			userLiftCollection: userLiftCollection
		});
	});

	$('.lift-summary-filter').each(function(index, element) {
		new LiftListFilterView({
			el: $(element),
			model: userLiftFilter,
			collection: userLiftCollection
		});
	});
});

