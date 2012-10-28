define([
    'jquery',     // lib/jquery/jquery
    'underscore', // lib/underscore/underscore
    'backbone'    // lib/backbone/backbone
], function($, _, Backbone) {

    return Backbone.View.extend({

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
});

