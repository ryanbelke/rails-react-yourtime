class StaticPagesController < ApplicationController
  include ReactOnRails::Controller
  def home
    #redux_store("commentsStore", props: {name: 'hello' })
    # pull all workplace for the selection dropdown
    @workplaces = Workplace.all.sort_by &:created_at
   #set appointment feed for a non admin user
    if logged_in?
     @appointment_feed = current_user.appointments
   end


#check to see if a user exsists, if so is the user admin to see all the feeds
    if current_user && current_user.admin?
      @categories = Category.all
      @services = Service.all
      @feed_items = Workplace.where.not(workplace_name: "Not Listed").paginate(page: params[:page])
      @location_feed_items = Location.all.paginate(page: params[:page])
      @service_feed_items = Service.all.paginate(page: params[:page])
      @appointment_feed = current_user.appointments.paginate(page: params[:page])
      @category_feed = Category.order(:workplace_id).paginate(page: params[:page])

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
