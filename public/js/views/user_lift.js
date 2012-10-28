// TODO: format to use require js
wod.View.UserLift = Backbone.View.extend({

	tagName: 'tr',

    className: 'user-lift',

    tpl: JST['templates/user_lift'],

    initialize: function() {
		_.bindAll(this, 'render');
    },

	render: function() {
        $(this.el).data('user_lift_id', this.model.get('id'));
		$(this.el).html(this.tpl(this.model.toJSON()));
		return this;
	}
});

wod.View.UserLifts = Backbone.View.extend({

    initialize: function() {
		_.bindAll(this, 'addAll', 'addOne');

        this.collection.fetch();
        this.collection.on('reset', this.addAll);
        this.collection.on('add', this.addAll);
    },

    addOne: function(entry) {
        var liftName = entry.get('lift_category_name'),
            $container = this.$('.content [data-lift-name="' + liftName + '"]');

        if ($container.length === 0) {
            $container = $('<div />').attr('data-lift-name', liftName);
            $container.appendTo(this.$('.content'));
            $('<p />').text(liftName + 's').appendTo($container);
        }

        $container.append(new wod.View.UserLift({ model: entry }).render().el);

    },

    addAll: function() {
        this.$('.content').html('');
		this.collection.each(this.addOne);

    }
});

wod.View.AddUserLift = Backbone.View.extend({

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

