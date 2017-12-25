class AppointmentsController < ApplicationController
  def new
    @category = Category.friendly.find(params[:category_id])
    puts "****** "
    if params[:service]
      @service = Service.friendly.find(params[:service])
      @schedules = @category.schedules
      puts "schedules = " + @schedules.to_yaml
      @dates = @schedules.pluck(:date).map{ |entry| [entry.strftime("%Y-%m-%d").gsub('-', ',')]}

      @service_feed_items = @schedules

    else
      @service_feed_items = @category.services

    end

  end
end
