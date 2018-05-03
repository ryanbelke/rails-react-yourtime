class AddCategoryIdSectionIdToBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :section_id, :bigint
  end
end
