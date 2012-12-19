require 'data_mapper'
require 'dm-types'
require 'dm-ar-finders'
require 'uuidtools'
require 'do_postgres'
require 'yaml'

# set up logging
DataMapper::Logger.new($stdout, :debug)

settings = YAML.load_file('/etc/fitbox/config.yml') 
settings = settings['production']

db = settings['database']
db_url = "#{db['protocol']}://#{db['user']}:#{db['password']}@#{db['host']}:#{db['port']}/#{db['database']}"

DataMapper.setup(:default, db_url)
# throw an exception on any DM save failures
DataMapper::Model.raise_on_save_failure = true

require_relative "user"
require_relative "lift_category"
require_relative "lift"
require_relative "user_lift"

DataMapper.finalize
