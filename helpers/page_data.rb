# encoding: utf-8
module PageData
    def add_page_data *page_data
        @page_data ||= {}
        @page_data = args
    end

    def page_data(*args)
        page_data = args
        page_data.merge! @page_data if @page_data
		return page_data.to_hash
    end
end

