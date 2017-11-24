class AddStatusToAppointment < ActiveRecord::Migration[5.1]
  def change
    add_column :appointments, :appointment_status, :string
  end
end
