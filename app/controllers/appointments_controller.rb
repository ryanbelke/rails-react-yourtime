class AppointmentsController < ApplicationController
  def new
    @user = User.find_by id: params[:id]
    @workplace = Workplace.friendly.find(cookies[:workplace])
    @category = Category.friendly.find(cookies[:category])
    @service = Service.friendly.find(cookies[:service])
    @selected_date = cookies[:date]

    @schedules = @category.schedules
    @dates = @schedules.pluck(:date).map{ |entry| [entry.strftime("%Y-%m-%d").gsub('-', ',')]}
    puts "***** " + @selected_date.to_s
    @service_feed_items = []

    #set tax information
    @tax_amount1 = (0.09 * @service.service_price)
    @tax_amount = sprintf('%.2f', @tax_amount1)
    @your_time_amount1 = (0.05 * @service.service_price)
    @your_time_amount = sprintf('%.2f', @your_time_amount1)
    @total_price1 = @tax_amount1 + @your_time_amount1 + @service.service_price
    @total_price = sprintf('%.2f', @total_price1)
  end
end
