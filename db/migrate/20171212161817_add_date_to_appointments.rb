class AddDateToAppointments < ActiveRecord::Migration[5.1]
  def change
    add_column :appointments, :appointment_date, :date
  end
end
