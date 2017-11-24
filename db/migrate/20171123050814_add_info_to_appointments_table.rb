class AddInfoToAppointmentsTable < ActiveRecord::Migration[5.1]
  def change
    add_column :appointments, :appointment_date, :date
    add_column :appointments, :appointment_location, :string
    add_column :appointments, :appointment_description, :string

  end
end
