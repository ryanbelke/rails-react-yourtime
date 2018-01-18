class AddLocationIdToAppointments < ActiveRecord::Migration[5.1]
  def change
    add_column :appointments, :location_id, :integer
  end
end
