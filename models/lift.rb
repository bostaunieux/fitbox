class Lift
    include DataMapper::Resource

    property :id,          Serial
    property :name,        String, :required => true, :length => 75
    property :description, String, :length => 250

    belongs_to :lift_category

end

