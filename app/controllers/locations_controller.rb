class LocationsController < ApplicationController
  before_action :admin_user, only: [:create, :destroy, :edit, :update]

  def index
    @category = Category.friendly.find(params[:category_id])
    @location_feed_items = @category.locations
    cookies[:category] = @category.slug
     if @location_feed_items.count == 1
     end

  end

  def new
    @category = Category.friendly.find(params[:category_id])
    @location = @category.locations.new
  end

  def edit
    @category = Category.friendly.find(params[:category_id])
    @location = Location.friendly.find(params[:id])

  end

  def create
      @category = Category.friendly.find(params[:category_id])
      @location = @category.locations.new(location_params)
      if @location.save
        if params[:create_and_add]
          flash[:success] = "Category Created, adding dates"
          redirect_to new_location_schedule_path(@location.slug)
        else
          flash[:success] = "Location created"
          redirect_to root_url
        end

      else
        @feed_items = []
        render 'static_pages/home'
      end
  end

  def update
    @location = Location.friendly.find(params[:id])
    if @location.update_attributes(location_params)
      flash[:success] = "Location updated"
      redirect_to root_url
    else
      render 'edit'
    end
  end

  def destroy
      Location.friendly.find(params[:id]).destroy
      flash[:success] = "Location deleted"
      #delete cookies from application_controller method
      delete_cookies
      redirect_to request.referrer || root_url
  end

  def show
    @category = Category.friendly.find(params[:category_id])
    @location = Location.friendly.find(params[:id])
    @schedule_feed = @location.schedules
    @section_feed_items = @location.sections
  end

  private

  def location_params
    params.require(:location).permit(:location_name, :location_address, :location_description)
  end



  def admin_user
    redirect_to(root_url) unless current_user.admin?
  end

end
