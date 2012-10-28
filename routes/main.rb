# encoding: utf-8
class Fenrir < Sinatra::Base

    before do
        session['user_id'] ||= nil

		@user = User.get(session['user_id']) unless session['user_id'].nil?
    end

    get '/' do
        slim :index, :locals => {
            :user => @user,
            :lifts => Lift.all,
            :title => "FitBox.io - CrossFit Record Logger"
        }
    end

	get '/member/lift/:lift_id' do
		halt 403 if @user.nil?

        begin
            lift = Lift.get(params['lift_id'])
        rescue Exception => e
			halt 400
        end

		halt 404 if lift.nil?

        slim :member_lift, :locals => {
            :user => @user,
			:lift => lift,
            :title => "FitBox.io - #{lift.name} Records for #{@user.handle}"
        }
	end

end

