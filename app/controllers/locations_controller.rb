class LocationsController < ApplicationController
  before_action :admin_user, only: [:create, :destroy, :edit, :update]

  def index
    @category = Category.friendly.find(params[:category_id])
    @location_feed_items = @category.locations
     if @location_feed_items.count == 1
       #Take First Location, redirect to that locations services
       #@location = @location_feed_items.first
       #send to /locations/:id/services
       #redirect_to location_services_path(@location.slug)
     end

  end

  def new
    @category = Category.friendly.find(params[:category_id])
    @location = @category.locations.new
  end

  def edit
    @workplace = Workplace.friendly.find(params[:workplace] || params[:workplace_id])
    @location = @workplace.locations.friendly.find(params[:id])

  end

  def create
    if @current_user.admin?
      @category = Category.friendly.find(params[:category_id])
      @location = @category.locations.new(location_params)
      if @location.save
        flash[:success] = "Location created"
        redirect_to root_url
      else
        @feed_items = []
        render 'static_pages/home'
      end
    end
  end

  def update
    @workplace = Workplace.friendly.find(params[:workplace] || params[:workplace_id])
    @location = @workplace.locations.friendly.find(params[:id])
    if @location.update_attributes(location_params)
      flash[:success] = "Location updated"
      redirect_to root_url
    else
      render 'edit'
    end
  end

  def destroy
    if current_user.admin?
      Location.friendly.find(params[:id]).destroy
      flash[:success] = "Location deleted"
      redirect_to request.referrer || root_url
    end
  end

  def show
    @category = Category.friendly.find(params[:category_id])
    @location = Location.friendly.find(params[:id])
  end

  private

  def location_params
    params.require(:location).permit(:location_name, :location_address, :location_description)
  end

  def admin_user
    redirect_to(root_url) unless current_user.admin?
  end

end
