class AddIndexToAppointments < ActiveRecord::Migration[5.1]
  def change
    add_index :appointments, :location_id
    add_index :services, :appointment_id
  end
end
