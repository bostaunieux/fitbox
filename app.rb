# encoding: utf-8
require 'sinatra/base'
require 'sinatra/partial'
require 'sinatra/jstpages'
require 'slim'

class Fenrir < Sinatra::Base

=begin
    use Rack::Session::Cookie,
        :key => 'rack.session',
        :domain => 'bostau.com',
        :path => '/',
        :expire_after => 60 * 60 * 24 * 7,
        :secret => 'fuzzy tooth trample tourney'
=end
# TODO: why the hell doesn't the above work?
    enable :sessions

    register Sinatra::Partial
    register Sinatra::JstPages # enable javascript templates
    serve_jst '/jst.js' # specifies where jst files will be served

    set :partial_template_engine, :slim
    set :logging, true

    configure :production do
        set :slim, :pretty => false
        set :clean_trace, true
    end

    configure :development do
        set :slim, :pretty => true
    end

    helpers do
        include Rack::Utils
        # alias_method :h, :escape_html
    end
end

require_relative 'models/init'
require_relative 'routes/init'

class String
    def to_bool
        return true   if self == true   || self =~ (/(true|t|yes|y|1)$/i)
        return false  if self == false  || self.nil? || self =~ (/(false|f|no|n|0)$/i)
        raise ArgumentError.new("invalid value for Boolean: \"#{self}\"")
    end
end
