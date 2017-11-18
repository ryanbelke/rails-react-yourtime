class StaticPagesController < ApplicationController
  include ReactOnRails::Controller
  def home
    redux_store("commentsStore", props: {name: 'hello' })
    @locations = Location.all.pluck(:location_name)
    if logged_in?
     # @micropost  = current_user.microposts.build
      @feed_items = Location.all.paginate(page: params[:page])

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
