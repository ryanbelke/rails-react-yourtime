class AddChargedBookingToBooking < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :charged_booking, :json, null: false, default: '{}'
  end
end
