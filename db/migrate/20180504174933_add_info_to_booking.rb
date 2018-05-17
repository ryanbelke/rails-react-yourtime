class AddInfoToBooking < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :location_name, :string
    add_column :bookings, :category_name, :string
    add_column :bookings, :service_name, :string
  end
end
