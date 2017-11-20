class LocationsController < ApplicationController
  before_action :admin_user, only: [:create, :destroy, :edit, :update]

  def index
    @workplace = Workplace.friendly.find(params[:workplace] || params[:workplace_id])
    @location_feed_items = @workplace.locations.where.not(location_name: "Not Listed").paginate(page: params[:page])
  end

  def new
    @workplace = Workplace.friendly.find(params[:workplace] || params[:workplace_id])
    @location = @workplace.locations.build
  end

  def edit
    @workplace = Workplace.friendly.find(params[:workplace] || params[:workplace_id])
    @location = @workplace.locations.friendly.find(params[:id])

  end

  def create
    if @current_user.admin?
      @workplace = Workplace.friendly.find(params[:workplace] || params[:workplace_id])
      @location = @workplace.locations.build(location_params)
      if @location.save
        flash[:success] = "Workplace created"
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
      Location.find(params[:id]).destroy
      flash[:success] = "Location deleted"
      redirect_to request.referrer || root_url
    end
  end

  def show
    @workplace = Workplace.friendly.find(params[:workplace] || params[:workplace_id])
    @location = Location.friendly.find(params[:id])
  end

  private

  def location_params
    params.require(:location).permit(:location_name, :location_address, :location_description, :workplace_name)
  end

  def admin_user
    redirect_to(root_url) unless current_user.admin?
  end

end
