class LocationsController < ApplicationController
  before_action :admin_user, only: [:create, :destroy, :edit, :update]

  def index
    @feed_items = Location.where.not(location_name: "Not Listed").paginate(page: params[:page])
  end
  def new
    @location = Location.new
  end

  def edit
    @location = Location.find_by(id: params[:id])
  end
  def create
    if @current_user.admin?
     @location = current_user.locations.build(location_params)
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
    @location = Location.find(params[:id])
    if @location.update_attributes(location_params)
      flash[:success] = "Location updated"
      redirect_to root_url
    else
      render 'edit'
    end
  end

  def destroy
    if current_user.admin?
    Location.find(params[:id]).destroy
    flash[:success] = "Location deleted"
    redirect_to request.referrer || root_url
    end

  end

private
  def location_params
    params.require(:location).permit(:location_name, :location_address, :location_description)
  end

  def admin_user
    redirect_to(root_url) unless current_user.admin?
  end
end
