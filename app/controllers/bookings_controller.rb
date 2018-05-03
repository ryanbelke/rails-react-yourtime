class BookingsController < ApplicationController
  include ReactOnRails::Controller
  require 'date'

  before_action :logged_in_user, only: [:new, :create, :show]
  before_action :correct_user,   only: [:edit, :update, :cancel]
  before_action :admin_user,     only: :destroy
  before_action :check_cookies, only: :new

  def new
    redux_store("commentsStore")
    @booking_feed = []
      workplace = cookies[:workplace]
      category = cookies[:category]
      location = cookies[:location]
      section = cookies[:section]
      service = cookies[:services]

      @user = current_user
      @workplace = Workplace.friendly.find(workplace)
      @category = Category.friendly.find(category)
      @location = Location.friendly.find(location)
      @section = Section.friendly.find(section)
      #@service = Service.friendly.find(service[:slug])
      @selected_date = params[:date] || cookies[:date]

      if @selected_date.nil?
      else
        @schedule = Schedule.find_by date: @selected_date
      end
      schedules = @location.schedules
      dates = schedules.where('date_reserved < date_capacity')
      @dates = dates.pluck(:date).map{ |entry| [entry.strftime("%Y-%m-%d").gsub('-', ',')]}

      puts "** date mee= " + dates.to_yaml

      #set services feed to empty array to prevent from showing at the bottom
      @service_feed_items = []

      @total_price = 0

      #Calculate service total
      service_list = JSON.parse(cookies[:services])
      service_list.each do |item|
        service = Service.find_by id: item
        puts "fee " + service.yourtime_fee.to_s
        your_time_fee = (1 + service.yourtime_fee)
        puts "yourtime fee percent = " + your_time_fee.to_s
        @total_price = @total_price + (service.service_price * your_time_fee).round(2) + service.service_tax
        puts "tally of actual prices " + " " + service.service_price.to_s + " " + service.service_tax.to_s + " " + service.yourtime_fee.to_s
      end
      #Calculate AddOn Total
      add_on_list = JSON.parse(cookies[:addOns])
      add_on_list.each do |addItem|

        add_on = Service.find_by id: addItem
        your_time_fee = (1 + add_on.yourtime_fee)
        @total_price = @total_price + (add_on.service_price * your_time_fee).round(2) + add_on.service_tax
        puts "tally of actual prices " + " "+ add_on.service_price.to_s + " " + add_on.service_tax.to_s + " " + add_on.yourtime_fee.to_s

      end

      puts "TOTAL PRICE = *** " + @total_price.to_s
      booking = {
          bookingId: SecureRandom.uuid,
          workplaceName: @workplace.workplace_name,
          categoryName: @category.category_name,
          locationName: @location.location_name,
          sectionName: @section.section_name,
          service: @service,
          dates: @dates,
      }
      @booking_feed.push(booking)
      @booking = @user.bookings.new
      cookies[:redirect] = { value: false, expires: 1.hour.from_now }

  end

  # POST /bookings
  def create

    user = User.find_by id: params[:user_id]
    services = JSON.parse(cookies[:services])
    date = params[:date]
    puts " date= "+date

    location = Location.friendly.find(cookies[:location])
    puts "DATE = + " + date.to_s

    if date.nil?
      flash[:danger] = "please select date"
      redirect_to new_user_booking_path(current_user)
    elsif date.eql? "NaN-NaN-NaN"
      flash[:danger] = "please select date"
      redirect_to new_user_booking_path(current_user)
    else
      selected_date = params[:date] || cookies[:date]
    end


      #convert date to datetime for lookup in the database
      schedule = location.schedules.find_by unix: date.to_s
      puts "**** schedule = " + schedule.to_s

      #------------pricing
      total_price = 0
      total_tax = 0
      your_time_fee = 0

      service_list = JSON.parse(cookies[:services])

      service_list.each do |item|
        service = Service.find_by id: item
        puts "fee " + service.yourtime_fee.to_s
        your_time_fee = (1 + service.yourtime_fee)
        puts "yourtime fee percent = " + your_time_fee.to_s
        total_price = total_price + (service.service_price * your_time_fee).round(2) + service.service_tax
        puts "tally of actual prices " + " " + service.service_price.to_s + " " + service.service_tax.to_s + " " + service.yourtime_fee.to_s
      end

      add_on_list = JSON.parse(cookies[:addOns])

      add_on_list.each do |addItem|
        add_on = Service.find_by id: addItem
        your_time_fee = (1 + add_on.yourtime_fee)
        total_price = total_price + (add_on.service_price * your_time_fee).round(2) + add_on.service_tax
        puts "tally of actual prices " + " "+ add_on.service_price.to_s + " " + add_on.service_tax.to_s + " " + add_on.yourtime_fee.to_s
      end

      first_service = Service.find_by id: services.first
      services = service_list.concat(add_on_list)
      puts "*** full services = " + services.to_s
      puts "****** BOOKING MESSAGE = " + params[:booking_notes].to_s
      booking = user.bookings.create(
          service_id: services, schedule_id: schedule.id, date: schedule.date, booking_notes: params[:booking_notes],
          booking_status: 'Pending', location_id: location.id, booking_location: location.location_name,
          booking_price: total_price, workplace_id: first_service.section.location.category.workplace.id,
          category_id: first_service.section.location.category.id, section_id: first_service.section.id,
      )

      puts "**** booking = " + booking.to_json

      if booking.save
        # TODO STORE CHARGE ID IN DATABASE

        if schedule.date_reserved < schedule.date_capacity
          schedule.increment!(:date_reserved)
          if schedule.date_reserved >= schedule.date_capacity
            flash[:danger] = "Date has reached capacity"
            redirect_to new_user_booking_path(current_user)
          end
        end

        puts "total price === " + (total_price * 100).floor.to_s

        #create customer, validating card details and saving them under customer object
        customer = Stripe::Customer.create(
          :email => params[:stripeEmail],
          :source  => params[:stripeToken]
        )
        current_user.update(stripe_id: customer.id)
        delete_cookies
        flash[:success] = "Thank you for making a booking"

        if request.xhr?
        respond_to do |format|
          format.json { render json: { message: "booking complete", status: 302 }  }
        end
          else
        redirect_to root_url, turbolinks: false
        end

      else
        puts "*** BOOKING NOT SAVED "
        redirect_to new_user_booking_path(current_user)
      end
  end

  #get
  def show
    @booking = Booking.find params[:id]
    @user = User.find_by id: params[:user_id]
    @location = @booking.location_id
    @location = Location.find_by id: @location
    @category = @location.category
    @workplace = @category.workplace

    @service = @booking.service_id
  end

  #post /CANCEL
  def cancel
    booking = Booking.find(params[:id])
    booking.booking_status = "Canceled"

    if booking.save!
      flash[:success] = "Booking Canceled"
      redirect_to root_url
    else
      render :show.
    end
    end

  end

  def edit
    redux_store("commentsStore")
    @booking = Booking.find_by id: params[:id]
  end

  def destroy
    Booking.find(params[:id]).destroy
    flash[:success] = "Booking Deleted"
    redirect_to root_url
  end

  private
    def booking_params
      params.require(:booking).permit(:user_id, :service_id, :schedule_id,
                                          :workplace_id, :booking_status,
                                          :booking_description, :stripe_id, :services, :booking_notes,
                                          :category_id, :section_id,

      )
    end
  end

