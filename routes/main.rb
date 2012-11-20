# encoding: utf-8
class Fenrir < Sinatra::Base

    before do
        session['user_id'] ||= nil

		@user = User.get(session['user_id']) unless session['user_id'].nil?
		@page_data = {}
    end

    get '/' do
		@js_page = 'index'

        slim :index, :locals => {
            :user => @user,
            :lifts => Lift.all,
            :title => "FitBox.io - CrossFit Record Logger"
        }
    end

	get '/lift/:lift_name/:lift_id' do
		redirect to('/') if @user.nil?

        begin
            lift = Lift.get(params['lift_id'])
        rescue Exception => e
			halt 400
        end

		halt 404 if lift.nil?

		@js_page = 'lift'
		@page_data['liftId'] = params[:lift_id]

        slim :lift, :locals => {
            :user => @user,
			:lift => lift,
            :title => "FitBox.io - #{lift.name} Records for #{@user.handle || @user.email }"
        }
	end

	get '/user/prefs' do
		redirect to('/') if @user.nil?

		@js_page = 'prefs'

        slim :prefs, :locals => {
            :user => @user,
            :title => "FitBox.io - Preferences for #{@user.handle || @user.email }"
        }
	end

end

