class StaticPagesController < ApplicationController
  include ReactOnRails::Controller
  def home
    redux_store("commentsStore", props: {name: 'hello' })
    if logged_in?
      @micropost  = current_user.microposts.build
      @feed_items = current_user.purchases.paginate(page: params[:page])

    end
  end

  def help
  end
  
  def about
  end

  def contact
  end
end
