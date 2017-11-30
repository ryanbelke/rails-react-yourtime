class ServicesController < ApplicationController
    before_action :logged_in_user, only: [ :create ]
    #before_action :correct_user,   only: [:create, :index]
    before_action :admin_user,     only: [:edit, :create, :destroy, :new]

    #GET /SERVICE
    def index
      @location = Location.friendly.find(params[:location_id])
      @service_feed_items = @location.services.paginate(page: params[:page])
    end

    def new
      @location = Location.friendly.find(params[:location_id])
      @service = @location.services.build
    end
    #POST /SERVICE
    def create
        @location = Location.friendly.find(params[:location_id])
        @service =@location.services.build(service_params)
        if @location.save
          flash[:success] = "Service created"
          redirect_to root_url
        else
          @feed_items = []
          render 'static_pages/home'
        end
    end
    #PUT /SERVICE/:ID
    def edit
      @service = Service.friendly.find(params[:id])
    end
    #DELETE /SERVICE/:ID
    def destroy
      Service.friendly.find(params[:id]).destroy
      flash[:success] = "Service deleted"
      redirect_to request.referrer || root_url
    end

    private

    def service_params
      params.require(:service).permit(:service_name, :service_description, :service_price,
                                      :service_time_to_complete)
    end

    # Before filters
    # Confirms the correct user.
    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless current_user?(@user)
    end

    # Confirms an admin user.
    def admin_user
      redirect_to(root_url) unless current_user.admin?
    end
  end
