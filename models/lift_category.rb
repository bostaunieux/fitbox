class LiftCategory
    include DataMapper::Resource

    property :id,     Serial
    property :name,   String, :required => true, :key => true, :length => 75

end

