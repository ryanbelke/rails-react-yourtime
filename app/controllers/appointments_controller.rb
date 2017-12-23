class AppointmentsController < ApplicationController
  def new
    @category = Category.friendly.find(params[:category_id])
    @service_feed_items = @category.services
  end
end
