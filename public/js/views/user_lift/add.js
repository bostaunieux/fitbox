define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    return Backbone.View.extend({

        initialize: function() {
            _.bindAll(this, 'onAddEntry');

            this.$lift        = this.$('[name="lift_id"]');
            this.$date        = this.$('[name="date"]');
            this.$weight      = this.$('[name="weight"]');
            this.$repetitions = this.$('[name="repetitions"]');

            this.$date.datepicker();

            this.resetFields();
        },

        resetFields: function() {
             // set datepicker to the current date
             this.$date.datepicker('setDate', new Date());

             this.$repetitions.val('1');
             this.$weight.val('');
        },

        events: {
            'click input.addEntry' : 'onAddEntry'
        },

        onAddEntry: function(event) {
            event.preventDefault();

            this.collection.create({
                'lift_id':     this.$lift.val(),
                'date':        this.$date.datepicker('getDate').getTime() / 1000,
                'weight':      this.$weight.val(),
                'repetitions': this.$repetitions.val()
            }, {wait: true});

            this.resetFields();
        }
	});
});

