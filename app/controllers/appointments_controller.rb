class AppointmentsController < ApplicationController
  def new
    @category = Category.friendly.find(params[:category_id])
    #set category cookie
    cookies[:category] = @category.slug
    puts "****** " + cookies[:category]

    if params[:service]
      @service = Service.friendly.find(params[:service])
      #set service cookie
      cookies[:service] = @service.slug

      @schedules = @category.schedules
      @dates = @schedules.pluck(:date).map{ |entry| [entry.strftime("%Y-%m-%d").gsub('-', ',')]}
      #grab selected date from the form to input when user hits save and create cookie for future use
      @selected_date = params[:date]
      cookies[:date] = @selected_date

      @service_feed_items = @schedules
    else
      @service_feed_items = @category.services

    end

  end
end
