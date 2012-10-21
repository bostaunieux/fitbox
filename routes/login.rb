# encoding: utf-8
class Fenrir < Sinatra::Base

  post '/api/register' do

      if params.nil?
          logger.error "Registration: No parameters set"
          halt 400
      end

      username = params['username']
      if username.nil?
          logger.error "Registration: No username"
          halt 400
      end

      email = params['email']
      if email.nil?
          logger.error "Registration: No email"
          halt 400
      end

      session_email = session['browserid_email']
      if email.nil? || session_email != email
          logger.error "Registration: Email mismatch session: #{session_email}, post: #{email}"
          halt 400
      end

      logger.info "Registration: New user email: #{email}, username: #{username}" 

      begin
          user = User.create({:email => email, :username => username})
      rescue Exception => e
          logger.error "Registration: Unable to create user - #{e.message}"
      end

      if user
          session['user_id'] = user.id
          redirect_url = session['authorize_redirect_url'] || '/'
          session['authorize_redirect_url'] = nil

          return {:valid => true}.to_json
      end

      return {:valid => false}.to_json
  end
end
