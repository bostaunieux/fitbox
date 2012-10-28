define([
    'jquery',     // lib/jquery/jquery
    'underscore', // lib/underscore/underscore
    'backbone'    // lib/backbone/backbone
], function($, _, Backbone) {

    return Backbone.View.extend({
        el: $('#user-info'),

        initialize: function() {

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
});

