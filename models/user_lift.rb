class UserLift
    include DataMapper::Resource

    property :id,          Serial
    property :repetitions, Integer
    property :weight,      Float
	property :date,        DateTime

    belongs_to :lift
	belongs_to :user

	def as_json(options = {})
		options[:methods] ||= []

		json = super(options)
		json[:date] = json[:date].to_time.to_i
		json[:lift_category_name] = self.lift.lift_category_name
		json[:lift_name] = self.lift.name

		return json
	end

end

