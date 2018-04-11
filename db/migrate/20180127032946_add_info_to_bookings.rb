class AddInfoToBookings < ActiveRecord::Migration[5.1]
  def change
    add_column :bookings, :workplace_id, :bigint
    add_column :bookings, :category_id, :bigint
  end
end
