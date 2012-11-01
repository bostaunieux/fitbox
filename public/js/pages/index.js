define([
    'jquery',     // lib/jquery/jquery
    'underscore', // lib/underscore/underscore
    'backbone',    // lib/backbone/backbone
	'collections/lift',
	'collections/user_lift',
	'views/lift/summary_collection',
	'domReady!'
], function($, _, Backbone, LiftCollection, UserLiftCollection, LiftCollectionView) {
	var liftCollection = new LiftCollection();
	var userLiftCollection = new UserLiftCollection();
	userLiftCollection.setSummaryOnly(true);
	userLiftCollection.fetch();

	$('.lift-summary-list').each(function(index, element) {
		new LiftCollectionView({
			el: $(element),
			collection: liftCollection,
			userLiftCollection: userLiftCollection
		});
	});
});

