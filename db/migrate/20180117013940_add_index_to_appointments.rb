class AddIndexToAppointments < ActiveRecord::Migration[5.1]
  def change
    add_index :appointments, :location_id
  end
end
