wod.View.User = Backbone.View.extend({
	el: $('#user-info'),

	initialize: function() {
//		_.bindAll(this, 'onValidLogIn');

		var $userData = this.$('#user-data');
		if ($userData[0]) {
			this.model.set({
				'id':     $userData.find('[name="id"]').val(),
				'email':  $userData.find('[name="email"]').val(),
				'handle': $userData.find('[name="handle"]').val()
			});
		}

		navigator.id.watch({
			loggedInUser: this.model.get('email'),

			onlogin: function(assertion) {
				$.ajax({
					type: 'POST',
					url: '/auth/login',
					data: { assertion: assertion },
					success: function(res, status, xhr) { window.location.reload(true); },
					error: function(xhr, status, err) { alert("login failure"); }
				});
			},
			
			onlogout: function() {
				$.ajax({
					type: 'POST',
					url: '/auth/logout',
					complete: function(res, status, xhr) { window.location.reload(true); }
				});
			}
		});
	},

	events: {
		'click [role="user-login"]' : 'onLogIn',
		'click [role="user-logout"]' : 'onLogOut'
	},

	/**
	 * Handle user clicking log-in
	 */
	onLogIn: function(event) {
        event.preventDefault();
		navigator.id.request();
	},

	onLogOut: function(event) {
		event.preventDefault();
		navigator.id.logout();
	}
});

wod.View.NewUser = Backbone.View.extend({

	tpl: JST['templates/new_user'],

	initialize: function() {
		_.bindAll(this, 'onRegister', 'onClose');

		this.model.on('register:valid', this.onValidRegistration, this);
		this.model.on('register:invalid', this.onInvalidRegistration, this);
	},

	events: {
		'click input.register' : 'onRegister',
		'click p.close' : 'onClose'
	},

	render: function() {
		this.$el.append(this.tpl({ email: this.model.get('email') }));
		this.$('.step2').hide();
		
		return this;
	},

	onRegister: function(event) {
		event.preventDefault();
		
		this.model.set({ email: this.$el.find('input[name="email"]').val() });
		this.model.set({ username: this.$el.find('input[name="username"]').val() });
		this.model.register();
	},

	onValidRegistration: function() {
		this.$('.step1').hide();
		this.$('.step2 p.message').html('Welcome ' + this.model.get('username') + '!');

        window.location.reload(true);
	},

	onInvalidRegistration: function() {
		this.$('.step1').hide();

		this.$('.step2 p.message').html('We were unable to register ' + this.model.get('username') + '.');
	},

	onClose: function() {
		// TODO: clean up bindings
		this.remove();
	}
});

