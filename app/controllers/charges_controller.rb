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

    if charge["paid"] == true
      puts "charge created "
      booking = Booking.find_by id: params[:booking_id]
      booking.update(booking_status: 'Complete')

      flash[:success] = "Booking complete"
    end

  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end

end
