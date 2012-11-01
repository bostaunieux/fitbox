# encoding: utf-8
module StaticAssets
    def js *scripts
        @js ||= []
        @js = args
    end

    def javascripts(*args)
        js = []
        js << settings.javascripts if settings.respond_to?('javascripts')
        js << args
        js << @js if @js
        js.flatten.uniq.map do |script| 
            "<script src='/pages/#{script}.js'></script>"
        end.join
    end
end

