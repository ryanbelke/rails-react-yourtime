class BookingsController < ApplicationController
  include ReactOnRails::Controller
  require 'date'

  before_action :logged_in_user, only: [:new, :create, :show]
  before_action :correct_user,   only: [:edit, :update, :cancel]
  before_action :admin_user,     only: :destroy
  before_action :check_cookies, only: :new

  def new
    redux_store("commentsStore")
    check_cookies
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

    date = Time.at(date.to_i).utc.to_datetime
    date = date.strftime('%F')
    puts " date= "+ date

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
      schedule = location.schedules.find_by slug: date.to_s
      puts "**** schedule = " + schedule.to_s

      #------------pricing
      total_price = 0
      total_tax = 0
      your_time_fee = 0

      service_list = JSON.parse(cookies[:services])

      #db column services_object_array
      services_object_array = []

      service_list.each do |item|
        #create services object to store the service id, name, section id, name
        services_object = {}
        service = Service.find_by id: item
        puts "fee " + service.yourtime_fee.to_s
        your_time_fee = (1 + service.yourtime_fee)
        puts "yourtime fee percent = " + your_time_fee.to_s
        total_price = total_price + (service.service_price * your_time_fee).round(2) + service.service_tax
        puts "tally of actual prices " + " " + service.service_price.to_s + " " + service.service_tax.to_s + " " + service.yourtime_fee.to_s


        #insert service id
        services_object[:service_id] = service.id
        puts "services object = " + services_object.to_s
        #insert service name
        services_object[:service_name] = service.service_name
        puts "services object = " + services_object.to_s
        #insert service price
        services_object[:service_price] = service.service_price
        #insert service tax
        services_object[:service_tax] = service.service_tax

        #insert section id
        services_object[:section_id] = service.section.id
        puts "services object = " + services_object.to_s

        #insert section name
        services_object[:section_name] = service.section.section_name
        puts "services object = " + services_object.to_s

        #push object into services_object_array and insert into db
        services_object_array.push(services_object)
        puts "services object array before  conversion " + services_object_array.to_s

      end


      add_on_list = JSON.parse(cookies[:addOns])

      add_on_list.each do |addItem|
        services_object = {}
        add_on = Service.find_by id: addItem
        your_time_fee = (1 + add_on.yourtime_fee)
        total_price = total_price + (add_on.service_price * your_time_fee).round(2) + add_on.service_tax
        puts "tally of actual prices " + " "+ add_on.service_price.to_s + " " + add_on.service_tax.to_s + " " + add_on.yourtime_fee.to_s
        #insert service id
        services_object[:service_id] = add_on.id
        puts "services object = " + services_object.to_s
        #insert service name
        services_object[:service_name] = add_on.service_name
        puts "services object = " + services_object.to_s
        #insert service price
        services_object[:service_price] = add_on.service_price
        #insert service tax
        services_object[:service_tax] = add_on.service_tax

        #insert section id
        services_object[:section_id] = add_on.section.id
        puts "services object = " + services_object.to_s

        #insert section name
        services_object[:section_name] = add_on.section.section_name
        puts "services object = " + services_object.to_s

        #push object into services_object_array and insert into db
        services_object_array.push(services_object)
        puts "services object array before  conversion " + services_object_array.to_s
      end
      # https://stackoverflow.com/questions/10829473/ruby-how-can-i-convert-an-array-of-data-to-hash-and-to-json-format
      services_object_array = services_object_array.map { |o| Hash[o.each_pair.to_a] }.to_json
      puts "services object array after conversion " + services_object_array.to_s

      first_service = Service.find_by id: services.first
      services = service_list.concat(add_on_list)
      discount_code_param = params[:discount_code]
      # puts "*** full services = " + services.to_s
      # puts "****** BOOKING MESSAGE = " + params[:booking_notes].to_s

      #TODO SAVE DISCOUNT_CODE TO BOOKING
      booking = user.bookings.create(
          services_object: services_object_array, service_id: services, schedule_id: schedule.id, date: schedule.date, booking_notes: params[:booking_notes],
          booking_status: 'Pending', location_id: location.id, booking_location: location.location_name,
          booking_price: total_price, workplace_id: first_service.section.location.category.workplace.id,
          category_id: first_service.section.location.category.id, section_id: first_service.section.id, discount_code: discount_code_param
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
        #delete_cookies
        flash[:success] = "Thank you for making a booking"

        if request.xhr?
        respond_to do |format|
          format.json { render json: { message: "booking complete", status: 302 }  }
        end
          else
        #redirect_to root_url, turbolinks: false
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

  def update
    booking = params[:booking]
    user = User.find_by id:  params[:user]
    #set action booking for the
    active_booking = Booking.find_by id: params[:booking_id].to_i
    puts "active_bookting = " + active_booking.to_s
    puts "booking = " + booking.to_s
    puts "params = " + params.to_s
    services = params[:booking][:services]

    puts "services = " + services.to_s
    #take services array and loop over each item putting it into service_id array
    modified_service_id = []

    #update service_id array and total price
    services = JSON.parse(services)
    puts "services parsed " + services.to_s
    services.each do |service|
      if service.present?
        puts "service = " + service.to_s
        puts "service_id = " + service['service_id'].to_s
        modified_service_id.push(service['service_id'])
        puts "updating modified_service_id " + modified_service_id.to_s
      end

    end

    #set variables for the update attributes
    workplace_id = booking[:workplace][:workplace_id]
    workplace_name = booking[:workplace][:workplace_name]
    category_id = booking[:category][:category_id]
    category_name = booking[:category][:category_name]
    location_id = booking[:location][:location_id]
    location_name = booking[:location][:location_name]
    date = booking[:date]
    puts "date = " + date.to_s
    time = Time.at(date.to_i)
    date = time.strftime('%Y-%m-%d')
    discount = booking[:discount]
    booking_notes = booking[:booking_notes]

    active_booking.update(booking_status: 'Pending',
                   service_id: modified_service_id,
                   workplace_id: workplace_id, workplace_name: workplace_name,
                   category_id: category_id, category_name: category_name,
                   location_id: location_id, location_name: location_name,
                   date: date, discount_code: discount, booking_notes: booking_notes)

    if  active_booking.save!
      flash[:success] = "Booking Updated"
      redirect_to root_url

    end

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
                                          :category_id, :section_id, :discount_code

      )
    end
  end

