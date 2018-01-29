class StaticPagesController < ApplicationController
  include ReactOnRails::Controller
  def home
    #redux_store("commentsStore", props: {name: 'hello' })
    # pull all workplace for the selection dropdown
    @workplaces = Workplace.all.sort_by &:created_at
   #set appointment feed for a non admin user
    if logged_in?
     @appointment_feed = current_user.appointments
     if cookies[:redirect]
       flash[:info] = "You have been redirected to a saved order"
       redirect_to new_user_appointment_path(current_user)
       cookies.delete :redirect
     end
    end



#check to see if a user exsists, if so is the user admin to see all the feeds
    if current_user && current_user.admin?
      @categories = Category.all
      @services = Service.all
      @feed_items = Workplace.where.not(workplace_name: "Not Listed")
      @location_feed_items = Location.all
      @service_feed_items = Service.all
      @appointment_feed = Appointment.all
      @category_feed = Category.order(:workplace_id)
      @section_feed_items = Section.all
      @service_feed_items = Service.all
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
