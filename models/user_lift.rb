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

    def self.top_lifts_for_user(user)
        top_lifts = self.find_by_sql(
            ["SELECT ul1.*
            FROM user_lifts ul1
            INNER JOIN (
                SELECT lift_id, repetitions, MAX(date) date
                FROM user_lifts
                WHERE user_id = ?
                GROUP BY lift_id, repetitions
            ) ul2
            ON ul1.lift_id = ul2.lift_id
                AND ul1.date = ul2.date
                AND ul1.repetitions = ul2.repetitions
                AND ul1.user_id = ?",
            user.id.to_s, user.id.to_s])

        result = []
        top_lifts.group_by do |entry|
            entry.lift_id
        end.values.each do |list|
            result << list.max_by do | entry|
                entry.weight
            end
        end

        return result
    end

end

