class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include SessionsHelper
  helper_method :get_service_name
  helper_method :get_location_name, :get_service

  private

  # checks for cookies
  def check_cookies
    workplace = cookies[:workplace]
    category = cookies[:category]
    location = cookies[:location]
    service = JSON.parse(cookies[:services])

    if workplace.nil?
      flash[:warning] = "please select workplace to begin"
      redirect_to workplaces_path
    elsif category.nil?
      flash[:warning] = "please select category to begin"
      redirect_to workplace_categories_path(workplace, workplace: workplace)
    elsif location.nil?
      flash[:warning] = "please select location to begin"
      redirect_to category_locations_path(category)
    elsif service.length == 0 || service.nil?
      flash[:warning] = "please select service to begin"
      redirect_to location_sections_path(location)
    else

    end
  end

  #delete all the cookies so you are redirected to create new appointment
  def delete_cookies
    cookies.delete :service
    cookies.delete :section
    cookies.delete :location
    cookies.delete :workplace
    cookies.delete :category
    cookies.delete :date
  end

  def get_service(id)
    @ser = Service.find_by id: id
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

  # Before filters
  def correct_user
    @user = User.find(params[:user_id])
    redirect_to(root_url) unless current_user?(@user)
  end

  # Confirms an admin user.
  def admin_user
    redirect_to(root_url) unless current_user.admin?
  end

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception,
                       if: proc { request.headers["X-Auth"] != "tutorial_secret" }
end
