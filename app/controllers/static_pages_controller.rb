class StaticPagesController < ApplicationController
  include ReactOnRails::Controller
  def home
    redux_store("commentsStore", props: {name: 'hello' })
    @workplaces = Workplace.all.pluck(:workplace_name)
    if logged_in?
     # @micropost  = current_user.microposts.build
      @feed_items = Workplace.where.not(workplace_name: "Not Listed").paginate(page: params[:page])



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
