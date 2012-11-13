define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    return Backbone.View.extend({

        initialize: function() {
            _.bindAll(this, 'onAddEntry', 'onRepClick', 'onCalendarIconClick');

            this.$lift        = this.$('[name="lift_id"]');
            this.$date        = this.$('[name="date"]');
            this.$weight      = this.$('[name="weight"]');
            this.$repetitions = this.$('[name="repetitions"]');
            this.$repsOther   = this.$('[name="reps-other"]');

            this.$date.datepicker();
            // set datepicker to the current date
            this.$date.datepicker('setDate', new Date());

            this.$repetitions.filter('[value=' + 1 + ']').prop('checked', true);

            this.resetFields();
        },

        resetFields: function() {

             this.$weight.val('');
        },

        events: {
            'click button[role="addEntry"]' : 'onAddEntry',
            'change [name="repetitions"]' : 'onRepClick',
            'click i.icon-calendar': 'onCalendarIconClick'
        },

        onRepClick: function(event) {

            if ($(event.target).val() === "Other") {
                this.$repsOther.show();
            } else {
                this.$repsOther.hide();
            }
        },

        onAddEntry: function(event) {
            event.preventDefault();

            var reps = this.$repetitions.val();
            if (reps == "Other") {
                reps = this.$repsOther.val();    
            }

            this.collection.create({
                'lift_id':     this.$lift.val(),
                'date':        this.$date.datepicker('getDate').getTime() / 1000,
                'weight':      this.$weight.val(),
                'repetitions': this.$repetitions.val()
            }, {wait: true});

            this.resetFields();
        },

        onCalendarIconClick: function(event) {
            this.$date.datepicker('show');
        }
	});
});

