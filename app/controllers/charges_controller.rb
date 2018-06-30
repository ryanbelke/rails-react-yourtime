class ChargesController < ApplicationController
  rescue_from Stripe::CardError, with: :catch_exception
  def new
  end

  def create
    booking = params[:booking]
    customer = User.find_by id:  params[:user]

    puts "booking = " + booking.to_s
    puts "params = " + params.to_s
    services = params[:booking][:services]

    puts "services = " + services.to_s

    total_price = 0

    services.each do |service|
      price = service[:servicePrice].to_i
      tax =  service[:serviceTax].to_i
      total_price += price
      total_price += tax
      puts "service price and tax " + price.to_s + " " + tax.to_s
    end
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
    new_services_array = []
    services = booking[:services]

    services.each do |service|
      puts "services = " + service.to_s
      new_services_array.push(service[:serviceId])
    end
    puts "services Array new " + new_services_array.to_s

    booking_json = {
        workplace_id: booking[:workplace][:workplace_id],
        workplace_name: booking[:workplace][:workplace_name],
        category_id: booking[:category][:category_id],
        category_name: booking[:category][:category_name],
        location_id: booking[:location][:location_id],
        location_name: booking[:location][:location_name],
        service_id: new_services_array,
        charged_services: booking[:services],
        date: booking[:date],
        discount: booking[:discount],
        booking_notes: booking[:booking_notes]
    }
    puts "booking json after being built = " + booking_json.to_s

    if charge["paid"] == true
      puts "charge created "
      booking = Booking.find_by id: params[:booking_id]
      booking.update(booking_status: 'Complete', charged_booking: booking_json.as_json)

      flash[:success] = "Booking complete"
    end

  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end

end
