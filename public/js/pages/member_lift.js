define([
    'jquery',     // lib/jquery/jquery
    'underscore', // lib/underscore/underscore
    'backbone',    // lib/backbone/backbone
	'collections/user_lift',
	'views/user_lift/collection',
	'domReady!'
], function($, _, Backbone, UserLiftCollection, UserLiftCollectionView) {
	var userLiftCollection = new UserLiftCollection();
	if (App.pageData.liftId) {
		userLiftCollection.setFilterByLift(App.pageData.liftId);
	}
	userLiftCollection.fetch();

	$('.user-lift-list').each(function(index, element) {
		new UserLiftCollectionView({
			el: $(element),
			collection: userLiftCollection
		});
	});
});

