class ServicesController < ApplicationController
    #before_action :correct_user,   only: [:create, :index]
    before_action :admin_user,     only: [:edit, :create, :destroy, :new]

    #GET /SERVICE
    def index
      @category = Category.friendly.find(params[:category_id])
      @service_feed_items = @category.services
    end

    def new
      @category = Category.friendly.find(params[:category_id])
      @service = @category.services.build
    end
    #POST /SERVICE
    def create
        @category = Category.friendly.find(params[:category_id])
        @service = @category.services.build(service_params)
        if @service.save
          flash[:success] = "Service created"
          redirect_to root_url
        else
          @services_feed_items = []
          render 'static_pages/home'
        end
    end

    #POST /Service/:id
    def update
      @service = Service.friendly.find(params[:id])
      if @service.update_attributes(service_params)
        flash[:success] = "Service updated"
        redirect_to root_url
      else
        render 'edit'
      end
    end
    #PUT /SERVICE/:ID
    def edit
      @category = Category.friendly.find(params[:category_id])
      @service = Service.friendly.find(params[:id])
    end
    #DELETE /SERVICE/:ID
    def destroy
      Service.friendly.find(params[:id]).destroy
      flash[:success] = "Service deleted"
      redirect_to request.referrer || root_url
    end

    def show
      @category = Category.friendly.find(params[:category_id])
      #set category cookie
      cookies[:category] = @category.slug
      puts "****** " + cookies[:category]
      @workplace = Workplace.friendly.find(cookies[:workplace])
        @service = Service.friendly.find(params[:id])
        #set service cookie
        cookies[:service] = @service.slug

        @schedules = @category.schedules
        @dates = @schedules.pluck(:date).map{ |entry| [entry.strftime("%Y-%m-%d").gsub('-', ',')]}
        #grab selected date from the form to input when user hits save and create cookie for future use
        @selected_date = params[:date]
        cookies[:date] = @selected_date
        cookies[:redirect] = { value: true, expires: 1.hour.from_now }
        @service_feed_items = []

      #set tax information
      @tax_amount1 = (0.09 * @service.service_price)
      @tax_amount = sprintf('%.2f', @tax_amount1)
      @your_time_amount1 = (0.05 * @service.service_price)
      @your_time_amount = sprintf('%.2f', @your_time_amount1)
      @total_price1 = @tax_amount1 + @your_time_amount1 + @service.service_price
      @total_price = sprintf('%.2f', @total_price1)


    end

    private

    def service_params
      params.require(:service).permit(:service_name, :service_description, :service_price,
                                      :service_time_to_complete, :service_info, :service_vendor,
                                      :picture, :link)
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
