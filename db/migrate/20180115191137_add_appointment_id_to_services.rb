class AddAppointmentIdToServices < ActiveRecord::Migration[5.1]
  def change
    add_column :services, :appointment_id, :integer
  end
end
