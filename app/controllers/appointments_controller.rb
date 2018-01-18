class AppointmentsController < ApplicationController
  before_action :logged_in_user, only: [:new, :create, :destroy]
  before_action :correct_user,   only: [:edit, :update]
  before_action :admin_user,     only: :destroy
  def new
    @user = current_user
    @workplace = Workplace.friendly.find(cookies[:workplace])
    @category = Category.friendly.find(cookies[:category])
    @service = Service.friendly.find(cookies[:service])
    @location = Location.friendly.find(cookies[:location])
    @selected_date = params[:date] || cookies[:date]
    if @selected_date.length > 1
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

  def create
    @user = User.find_by id: params[:user_id]
    service = Service.find_by id: params[:service_id]
    @location = Location.friendly.find(cookies[:location])

    if params[:date].length > 1
      date = params[:date].to_datetime

      #convert date to datetime for lookup in the database
      schedule = @location.schedules.find_by date: date
      puts "**** " + @location.schedules.to_yaml

      #------------pricing
      price = service.service_price
      tax_amount = calculate_tax(price)
      your_time_amount = calculate_fee(price)
      total_amount = ((service.service_price + tax_amount + your_time_amount ))

      @appointment = @user.appointments.create(
          service_id: service.id, schedule_id: schedule.id,
          appointment_status: 'Pending', location_id: @location.id,
          appointment_price: total_amount
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
    else
      flash[:danger] = "please select date"
      redirect_to new_user_appointment_path(current_user)
    end


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
      params.require(:appointment).permit(:user_id, :service_id, :schedule_id, :appointment_status,
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