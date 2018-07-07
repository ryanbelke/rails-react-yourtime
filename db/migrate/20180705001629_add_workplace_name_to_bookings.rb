class AddWorkplaceNameToBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :workplace_name, :string
  end
end
