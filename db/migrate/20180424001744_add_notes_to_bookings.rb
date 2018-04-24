class AddNotesToBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :booking_notes, :string
  end
end
