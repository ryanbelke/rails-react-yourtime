class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include SessionsHelper
  helper_method :get_service_name
  helper_method :get_location_name
  private
  #delete all the cookies so you are redirected to create new appointment
  def delete_cookies
    cookies.delete :service
    cookies.delete :section
    cookies.delete :location
    cookies.delete :workplace
    cookies.delete :category
    cookies.delete :date
  end

  def get_service_name(id)
    service = Service.find_by id: id
    service.service_name
  end

  def get_location_name(id)
    location = Location.find_by id: id
    location.location_name
  end
  # Confirms a logged-in user.
  def logged_in_user
    unless logged_in?
      store_location
      flash[:danger] = "Please log in."
      redirect_to login_url
    end
  end
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception,
                       if: proc { request.headers["X-Auth"] != "tutorial_secret" }
end
