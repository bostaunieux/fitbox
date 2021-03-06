# encoding: utf-8
class Fenrir < Sinatra::Base

    before do
        session['user_id'] ||= nil

        @user = User.get(session['user_id']) unless session['user_id'].nil?
        @page_data = {
            :isMobile => false
        }
    end

    before :agent => /iPhone/ do
        @page_data[:isMobile] = true
    end

    get '/' do
        all_lifts = Lift.all

        @js_page = 'index'
        @page_data[:lifts] = all_lifts
        @page_data[:userLifts] = @user.user_lifts.all unless @user.nil?

        slim :index, :locals => {
            :user => @user,
            :lifts => all_lifts,
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
        @page_data['userLifts'] = @user.user_lifts.all(:lift_id => lift.id)

        slim :lift, :locals => {
            :user => @user,
			:lift => lift,
            :title => "FitBox.io - #{lift.name} Log - #{@user.handle || @user.email }"
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

