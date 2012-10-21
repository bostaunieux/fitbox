# encoding: utf-8
class Fenrir < Sinatra::Base

    before do
        session['user_id'] ||= nil

        if !session['user_id'].nil?
            @user = User.first(:id => session['user_id'])
        end
    end

    get '/' do
        slim :index, :locals => {
            :user => @user,
            :lifts => Lift.all,
            :title => "CrossFit Record Logger - FitBox.io"
        }
    end

end

