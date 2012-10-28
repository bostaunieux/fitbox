# encoding: utf-8
class Fenrir < Sinatra::Base

    post '/auth/login' do
        domain = 'https://verifier.login.persona.org/verify'

        uri = URI.parse(domain)
        req = Net::HTTP::Post.new(uri.path)
        req.set_form_data({ 'audience' => request.host, 'assertion' => params['assertion'] })
        http = Net::HTTP.new(uri.host, uri.port)
        http.use_ssl = true if domain =~ /^https/
        response = http.request(req)

        json = JSON.parse(response.body)

        if json['status'] == 'okay'
            email = json['email']
            logger.info("Persona verified for email: #{email}")

            begin
                @user = User.first_or_create({ :email => email },
					{ :id => UUIDTools::UUID.random_create, :email => email })
            rescue Exception => e
                logger.error "Problem finding/creating user with email [#{email}] - #{e.message}"
                @user = nil
            end
        end

        if @user.nil?
            halt 400
        end

        session['user_id'] = @user.id
    end

	post '/auth/logout' do
		session['user_id'] = nil
	end

    ##############
    # START: LIFT
    ##############
    get '/api/lift' do

        begin
            lifts = Lift.all(:order => [ :lift_category_id.asc ])
        rescue Exception => e
            logger.error "[Lift] Problem loading lifts - #{e.message}"
        end

        return lifts.to_json
    end

    post '/api/lift' do

        data = JSON.parse(request.body.string)
        halt 400 if data.nil?

        logger.info "[Lift] Adding new lift - #{data.to_json}"

        begin
            lift = Lift.create(
                :name         => data["name"],
                :description  => data["description"],
                :lift_category => LiftCategory.first(:name => 'Custom')
            )
        rescue Exception => e
            logger.error "[Lift] Problem adding lift - #{e.message}"
        end

        return workout.to_json
    end
    ############
    # END: LIFT
    ############

    ###################
    # START: USER LIFT
    ###################
    get '/api/user/lift' do
        # forbidden
        halt 403 if @user.nil?


        begin
			if params['summary'] && params['summary'].to_bool == true
				entries = UserLift.top_lifts_for_user(@user)
			else
				entries = @user.user_lifts
			end
        rescue Exception => e
            logger.error "[User Lift] Problem loading user lifts - #{e.message}"
        end

        return entries.to_json
    end

    post '/api/user/lift' do
        # forbidden
        halt 403 if @user.nil?

        data = JSON.parse(request.body.string)
        halt 400 if data.nil?

        logger.info "[User Lift] Adding new user lift - #{data.to_json}"

        lift = Lift.get(data["lift_id"])
        halt 404 if lift.nil?

        begin
            entry = @user.user_lifts.new(
                :lift        => lift,
                :date        => Time.at(data["date"]),
                :weight      => data["weight"],
                :repetitions => data["repetitions"]
            )
            @user.save
        rescue Exception => e
            logger.error "[User Lift] Problem adding user lift - #{e.message}"
        end

        return entry.to_json
    end
    #################
    # END: USER LIFT
    #################
end

