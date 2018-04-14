class BookingsController < ApplicationController
  include ReactOnRails::Controller

  before_action :logged_in_user, only: [:new, :create, :destroy]
  before_action :correct_user,   only: [:edit, :update]
  before_action :admin_user,     only: :destroy
  def new
    redux_store("commentsStore")
    @booking_feed = []
    #parse booking cookie
    booking_cookie = JSON.parse(cookies[:booking], symbolize_names: true)

    workplace = booking_cookie[:workplaceSlug]
    category = booking_cookie[:categorySlug]
    location = booking_cookie[:locationSlug]
    section = booking_cookie[:sectionSlug]
    service = booking_cookie[:service]

    dates = booking_cookie[:dates]
    puts "booking_cookie = " + dates.to_s

    #TODO: set path specific to what is not present
    if workplace.nil? || category.nil? ||
       location.nil? || section.nil?
      flash[:warning] = "please select workplace to begin"
      redirect_to workplaces_path
    else

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
      @schedules = @location.schedules
      @dates = @schedules.pluck(:date).map{ |entry| [entry.strftime("%Y-%m-%d").gsub('-', ',')]}

      #set services feed to empty array to prevent from showing at the bottom
      @service_feed_items = []

=begin
      #set tax information
      #use number_to_currency helper in the view to convert to cents
      tax_amount = calculate_tax(@service.service_price)
      #@tax_amount1 = sprintf('%.2f', @tax_amount1)
      your_time_amount = calculate_fee(@service.service_price)
      #@your_time_amount1 = sprintf('%.2f', @your_time_amount1)
      @total_price = tax_amount + your_time_amount + @service.service_price
=end
      #@total_price1 = sprintf('%.2f', @total_price1)
      #@stripe_price = (@total_price1 * 100).to_i
      #bookingId = "booking" + rand(1...10000).to_s
      @total_price = 0
      serviceList = JSON.parse(cookies[:services])
      serviceList.each do |item|
        service = Service.find_by id: item
        @total_price = @total_price + service.service_price
        puts "**** service price " + service.service_price.to_s
      end
      addOnList = JSON.parse(cookies[:addOns])
      addOnList.each do |addItem|
        add_on = Service.find_by id: addItem
        @total_price = @total_price + add_on.service_price
        puts "**** add on price " + add_on.service_price.to_s

      end

      puts "TOTAL PRICE = *** " + @total_price.to_s
      #@total_price = 100
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
    end


  end

  def create
    #what is needed for booking?
    # user, date + services
    user = User.find_by id: params[:user_id]
    services = JSON.parse(cookies[:services])
    date = cookies[:date]
    location = Location.friendly.find(cookies[:location])

    if date.nil?
      flash[:danger] = "please select date"
      redirect_to new_user_booking_path(current_user)
    else
      puts "** date before conversion = " + date

      puts "**** date = " + date.to_s

      selected_date = params[:date] || cookies[:date]

      #convert date to datetime for lookup in the database
      schedule = location.schedules.find_by date: date
      puts "**** schedule = " + schedule.to_s


      #------------pricing
      total_price = 0
      total_tax = 0
      your_time_fee = 0

      service_list = JSON.parse(cookies[:services])
      service_list.each do |item|
        service = Service.find_by id: item
        total_price = total_price + service.service_price + service.service_tax + service.yourtime_fee
        total_tax = total_tax + service.service_tax
        your_time_fee = your_time_fee + service.yourtime_fee
        puts "**** service price " + service.service_price.to_s
      end
      add_on_list = JSON.parse(cookies[:addOns])
      add_on_list.each do |addItem|
        add_on = Service.find_by id: addItem
        total_price = total_price + add_on.service_price + add_on.service_tax + add_on.yourtime_fee
        puts "**** add on price " + add_on.service_price.to_s
        total_tax = total_tax + add_on.service_tax
        your_time_fee = your_time_fee + add_on.yourtime_fee

      end
      firstService = Service.find_by id: services.first
      booking = user.bookings.new(
          services: services, schedule_id: schedule.id, date: date,
         booking_status: 'Pending', location_id: location.id, booking_location: location.location_name,
          booking_price: total_price, workplace_id: firstService.section.location.category.workplace.id
      )

      puts "**** booking = " + booking.to_json

      if booking.save!
        #TODO STORE CHARGE ID IN DATABASE
        # TODO STORE CUSTOMER STRIPE ID IN DATABASE
=begin
      #Set customer charge
      customer = Stripe::Customer.create(
          :email => params[:stripeEmail],
          :source  => params[:stripeToken]
      )

      charge = Stripe::Charge.create(
          :customer    => customer.id,
          :amount      => @amount,
          :description => 'Rails Stripe customer',
          :currency    => 'usd',

          )
=end
      puts "*** BOOKING SAVED "

        cookies.delete :redirect
        flash[:success] = "Thank you for making a booking"
        redirect_to root_url
      else
        puts "*** BOOKING NOT SAVED "

        redirect_to new_user_booking_path(current_user)
      end
    end
  end

  def show
    @booking = Booking.find params[:id]

    @location = @booking.location
    category = @location.category
    @workplace = category.workplace

    @service = @booking.service
  end

  def destroy
    Booking.find(params[:id]).destroy
    flash[:success] = "Booking Deleted"
    redirect_to root_url
  end

  private

    def calculate_tax(price)
      (0.09 * price)
    end
    def calculate_fee(price)
      (0.05 * price)
    end

    def booking_params
      params.require(:booking).permit(:user_id, :service_id, :schedule_id,
                                          :workplace_id, :booking_status,
                                          :booking_description, :stripe_id, :services)
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