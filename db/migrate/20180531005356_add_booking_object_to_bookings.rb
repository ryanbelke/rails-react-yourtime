class AddBookingObjectToBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :services_object, :jsonb, null: false, default: '{}'
  end
end
