class ServicesController < ApplicationController
  include ReactOnRails::Controller
  require 'securerandom'

    before_action :admin_user,     only: [:edit, :create, :destroy, :new]
    before_action :check_cookies,   only: :booking

  #GET /SERVICE
    def index
      redux_store("commentsStore")
      @section = Section.friendly.find(params[:section])
      cookies[:section] = @section.slug
      @service_feed_items = @section.services
    end

    def new
      @section = Section.friendly.find(params[:section_id])
      @service = @section.services.new
    end
    #POST /SERVICE
    def create
        @section = Section.friendly.find(params[:section_id])
        @service = @section.services.new(service_params)

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
      @section = Section.friendly.find(params[:section_id])
      @service = Service.friendly.find(params[:id])
    end

    #DELETE /SERVICE/:ID
    def destroy
      Service.friendly.find(params[:id]).destroy
      flash[:success] = "Service deleted"
      redirect_to request.referrer || root_url
    end

    def show
      redux_store("commentsStore")
      #set booking feed to empty
      @booking_feed = []

    end
  #GET /services/booking
    def booking
      redux_store("commentsStore")
      @booking_feed = []

      if current_user
        redirect_to new_user_booking_path(current_user)
      else
        cookies[:redirect] = { value: true, expires: 1.hour.from_now }

      end
    end

  #POST /service :ID
    def service_info
      @services = Service.friendly.find(params[:service])

    end
  #POST /booking
    def booking_info
      redux_store("commentsStore")
      #set booking feed to empty
      @booking_feed = []
      workplace = Workplace.friendly.find(cookies[:workplace])
      category = Category.friendly.find(cookies[:category])
      location = Location.friendly.find(cookies[:location])
      section = Section.friendly.find(cookies[:section])

      schedules = location.schedules
      dates = schedules.where('schedules.date_reserved < schedules.date_capacity')
      puts " my date = " + dates.to_yaml
      @dates = dates.pluck(:date).map{ |entry| [entry.strftime("%Y-%m-%d").gsub('-', ',')]}
      puts "use this date " + dates.to_yaml
      #grab selected date from the form to input when user hits save and create cookie for future use

      #selected_date = location.schedules.find_by date: cookies[:date]

      #puts "selected ate = " + selected_date.to_s


      booking = {
          bookingId: SecureRandom.uuid,
          workplaceName: workplace.workplace_name,
          categoryName: category.category_name,
          locationName: location.location_name,
          sectionName: section.section_name,
          #service: service,
          dates: @dates,

          workplaceSlug: workplace.slug,
          categorySlug: category.slug,
          locationSlug: location.slug,
          sectionSlug: section.slug,
      }
      #delete cookies after stored in booking cookie
      #delete_cookies

      @booking_feed.push(booking)
      @service_feed_items = []

    end

    private

    def service_params
      params.require(:service).permit(:service_name, :service_description, :service_price,
                                      :service_time_to_complete, :service_info, :service_vendor,
                                      :picture, :add_on, :service_tax, :yourtime_fee)
    end
  end
