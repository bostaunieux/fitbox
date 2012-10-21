require 'data_mapper'
require 'dm-types'
require 'uuidtools'
require 'do_postgres'

# set up logging
DataMapper::Logger.new($stdout, :debug)

DataMapper.setup(:default, ENV['DATABASE_URL'] || "postgres://localhost/fenrir2")
# throw an exception on any DM save failures
DataMapper::Model.raise_on_save_failure = true

require_relative "user"
require_relative "lift_category"
require_relative "lift"
require_relative "user_lift"

DataMapper.finalize
