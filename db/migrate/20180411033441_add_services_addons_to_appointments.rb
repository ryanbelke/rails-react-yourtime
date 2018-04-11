class AddServicesAddonsToAppointments < ActiveRecord::Migration[5.2]
  def change
    add_column :appointments, :services, :string, array: true
    add_column :appointments, :add_ons, :string, array: true
  end
end
