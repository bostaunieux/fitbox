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

			this.datepickerEnabled = this.$date.prop('type') === 'text';

			if (this.datepickerEnabled) {
				this.$date.datepicker();
				// set datepicker to the current date
				this.$date.datepicker('setDate', new Date());
			}

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
			var error = false;

            var reps = this.$repetitions.filter(':checked').val();
            if (reps == "Other") {
                reps = this.$repsOther.val();    
            }

			var date = null;
			if (this.datepickerEnabled) {
				date = this.$date.datepicker('getDate');
			} else {
				date = $.datepicker.parseDate('yy-mm-dd', this.$date.val());
			}

			if (!date) {
				error = true;	
			}

			if (!error) {
				this.collection.create({
					'lift_id':     this.$lift.val(),
					'date':        date.getTime() / 1000,
					'weight':      this.$weight.val(),
					'repetitions': reps
				}, {wait: true});
			}

            this.resetFields();
        },

        onCalendarIconClick: function(event) {
			if (this.datepickerEnabled) {
				this.$date.datepicker('show');
			}
        }
	});
});

