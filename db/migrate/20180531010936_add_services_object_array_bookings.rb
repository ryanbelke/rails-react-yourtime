class AddServicesObjectArrayBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :services_object_array, :string, array: true, default: [], null: false
  end
end
