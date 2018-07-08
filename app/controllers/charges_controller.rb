class ChargesController < ApplicationController
  before_action :admin_user,     only: [:create, :new]
  rescue_from Stripe::CardError, with: :catch_exception

  def new
  end

  def create
    booking = params[:booking]
    customer = User.find_by id:  params[:user]

    puts "booking = " + booking.to_s + " " + "params = " + params.to_s
    services = params[:booking][:services]
    puts "services = " + services.to_s

    total_price = 0
    modified_service_id = []
    services.each do |service|
      if service.present?
        modified_service_id.push(service[:serviceId].to_i)
        puts "inside service check, service ID " + service[:serviceId].to_s
        price = service[:servicePrice].to_i
        tax =  service[:serviceTax].to_i
        total_price += price
        total_price += tax
        puts "service price and tax " + price.to_s + " " + tax.to_s
      end

    end
    puts "services Array new " + modified_service_id.to_s

    total_price = total_price * 100
    puts " total price = " + total_price.to_s
    #get total
    charge = Stripe::Charge.create(
        :customer    => customer.stripe_id,
        :amount      => total_price,
        :description => 'Rails Stripe customer',
        :currency    => 'usd'
    )
    puts "booking JSON = " + booking.as_json.to_s
    #set variables for the update attributes
    workplace_id = booking[:workplace][:workplace_id]
    workplace_name = booking[:workplace][:workplace_name]
    category_id = booking[:category][:category_id]
    category_name = booking[:category][:category_name]
    location_id = booking[:location][:location_id]
    location_name = booking[:location][:location_name]
    date = booking[:date]
    discount = booking[:discount]
    booking_notes = booking[:booking_notes]
    #update booking json to match variables
    booking_json = {
        workplace_id: workplace_id,
        workplace_name: workplace_name,
        category_id: category_id,
        category_name: category_name ,
        location_id: location_id,
        location_name: location_name,
        service_id: modified_service_id,
        charged_services: booking[:services],
        date: date,
        discount: discount,
        booking_notes: booking_notes
    }
    puts "booking json after being built = " + booking_json.to_s

    if charge["paid"]
      puts "charge created "
      booking = Booking.find_by id: params[:booking_id]
      booking.update(booking_status: 'Complete', charged_booking: booking_json.as_json,
                     service_id: modified_service_id, booking_price: total_price/100,
                     workplace_id: workplace_id, workplace_name: workplace_name,
                     category_id: category_id, category_name: category_name,
                     location_id: location_id, location_name: location_name,
                     date: date, discount_code: discount, booking_notes: booking_notes)

      flash[:success] = "Booking complete"
    end

  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end

end
