define([
    'jquery', 'underscore', 'backbone', 
	'config',
	'collections/user_lift',
	'views/user_lift/collection',
	'views/user_lift/add',
	'domReady!'
], function($, _, Backbone, Config, UserLiftCollection, UserLiftCollectionView, AddUserLiftView) {
	var userLiftCollection = new UserLiftCollection();
	if (Config.pageData.liftId) {
		userLiftCollection.setFilterByLift(Config.pageData.liftId);
		userLiftCollection.fetch();
	} else {
		console.log('liftId not defined');
	}

	$('.add-user-lift').each(function(index, element) {
		new AddUserLiftView({
			el: $(element),
			collection: userLiftCollection
		});
	});

	$('.user-lift-list').each(function(index, element) {
		new UserLiftCollectionView({
			el: $(element),
			collection: userLiftCollection
		});
	});
});

