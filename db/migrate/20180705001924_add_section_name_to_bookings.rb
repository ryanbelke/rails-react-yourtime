class AddSectionNameToBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :section_name, :string
  end
end
