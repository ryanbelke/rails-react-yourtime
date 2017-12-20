class AddLocationToAppointments < ActiveRecord::Migration[5.1]
  def change
    add_column :appointments, :appointment_location, :string
  end
end
