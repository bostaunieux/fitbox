class User
    include DataMapper::Resource

    property :id,     UUID, :key => true
    property :handle, String, :length => 50
    property :email,  String, :required => true, :unique => true,
        :format => :email_address,
        :messages => {
            :presence => "E-mail address is needed",
            :is_unique => "The provided e-mail address already exists",
            :format => "The provided e-mail address is invalid"
        }

    has n, :user_lifts
end

