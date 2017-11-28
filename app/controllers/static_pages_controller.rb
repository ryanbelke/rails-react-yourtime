class StaticPagesController < ApplicationController
  include ReactOnRails::Controller
  def home
    redux_store("commentsStore", props: {name: 'hello' })
    @workplaces = Workplace.all.sort_by &:created_at
    @locations = Location.all
    @services = Service.all

    if current_user.admin?
      @feed_items = Workplace.where.not(workplace_name: "Not Listed").paginate(page: params[:page])
      @location_feed_items = Location.all.paginate(page: params[:page])
      @service_feed_items = Service.all.paginate(page: params[:page])
      @appointment_feed = current_user.appointments.paginate(page: params[:page])

      @service = @appointment_feed.collect(&:service).pluck(:service_name)
    end
  end

  def services

  end

  def how

  end
  def pricing

  end

  def help
  end
  
  def about
  end

  def contact
  end
end
