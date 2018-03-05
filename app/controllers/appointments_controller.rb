class AppointmentsController < ApplicationController
  include ReactOnRails::Controller

  before_action :logged_in_user, only: [:new, :create, :destroy]
  before_action :correct_user,   only: [:edit, :update]
  before_action :admin_user,     only: :destroy
  def new
    redux_store("commentsStore")

    workplace = cookies[:workplace]
    category = cookies[:category]
    service = cookies[:service]
    location = cookies[:location]
    section = cookies[:section]

    if workplace.nil? || category.nil? ||
        service.nil? || location.nil? || section.nil?
      flash[:warning] = "please select workplace to begin"
      redirect_to workplaces_path
    else

      @user = current_user
      workplace = Workplace.friendly.find(cookies[:workplace])
      category = Category.friendly.find(cookies[:category])
      section = Section.friendly.find(cookies[:section])
      service = Service.friendly.find(cookies[:service])
      location = Location.friendly.find(cookies[:location])
      @selected_date = params[:date] || cookies[:date]
      if @selected_date.nil?
      else
        @schedule = Schedule.find_by date: @selected_date
      end
      @schedules = @location.schedules
      @dates = @schedules.pluck(:date).map{ |entry| [entry.strftime("%Y-%m-%d").gsub('-', ',')]}

      #set services feed to empty array to prevent from showing at the bottom
      @service_feed_items = []

      #set tax information
      #use number_to_currency helper in the view to convert to cents
      @tax_amount = calculate_tax(@service.service_price)
      #@tax_amount1 = sprintf('%.2f', @tax_amount1)
      @your_time_amount = calculate_fee(@service.service_price)
      #@your_time_amount1 = sprintf('%.2f', @your_time_amount1)
      @total_price = @tax_amount + @your_time_amount + @service.service_price
      #@total_price1 = sprintf('%.2f', @total_price1)
      #@stripe_price = (@total_price1 * 100).to_i
      @appointment = @user.appointments.new
    end

    booking = {
        bookingId: SecureRandom.uuid,
        workplace: workplace.workplace_name,
        category: category.category_name,
        location: location.location_name,
        section: section.section_name,
        service: service,
        dates: @dates,
    }

    cookies[:booking] = { value: booking.to_json }
    puts "=====" + JSON.parse(cookies[:booking]).to_s
    #delete cookies after stored in booking cookie
    #delete_cookies

    @booking_feed.push(booking)
    cookies[:redirect] = { value: true, expires: 1.hour.from_now }
    @service_feed_items = []

    #set tax information
    puts "***** " + service.to_yaml
    @tax_amount1 = (0.09 * service.service_price)
    @tax_amount = sprintf('%.2f', @tax_amount1)
    @your_time_amount1 = (0.05 * service.service_price)
    @your_time_amount = sprintf('%.2f', @your_time_amount1)
    @total_price1 = @tax_amount1 + @your_time_amount1 + service.service_price
    @total_price = sprintf('%.2f', @total_price1)

  end

  def create
    @user = User.find_by id: params[:user_id]
    service = Service.find_by id: params[:service_id]
    @location = Location.friendly.find(cookies[:location])
    date = params[:date].to_datetime
    category = Category.friendly.find(cookies[:category])
    if date.nil?
      flash[:danger] = "please select date"
      redirect_to new_user_appointment_path(current_user)
    else
      selected_date = params[:date] || cookies[:date]

      #date = params[:date].to_datetime

      #convert date to datetime for lookup in the database
      schedule = @location.schedules.find_by date: date


      #------------pricing
      price = service.service_price
      tax_amount = calculate_tax(price)
      your_time_amount = calculate_fee(price)
      total_amount = ((service.service_price + tax_amount + your_time_amount ))

      @appointment = @user.appointments.create(
          service_id: service.id, schedule_id: schedule.id,
          appointment_status: 'Pending', location_id: @location.id,
          appointment_price: total_amount, workplace_id: category.workplace.id
      )


      if @appointment.save
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

        cookies.delete :redirect
        flash[:success] = "Thank you for making an appointment"
        redirect_to root_url
      else
        render 'edit'
      end
    end
  end

  def show
    @appointment = Appointment.find params[:id]

    @location = @appointment.location
    category = @location.category
    @workplace = category.workplace

    @service = @appointment.service
  end

  def destroy
    Appointment.find(params[:id]).destroy
    flash[:success] = "Appointment Deleted"
    redirect_to root_url
  end

  private

    def calculate_tax(price)
      (0.09 * price)
    end
    def calculate_fee(price)
      (0.05 * price)
    end

    def appointment_params
      params.require(:appointment).permit(:user_id, :service_id, :schedule_id,
                                          :workplace_id, :appointment_status,
                                          :appointment_description, :stripe_id)
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