class ChangeAppointmentPriceToFloat < ActiveRecord::Migration[5.1]
  def change
    change_column :appointments, :appointment_price, :float
  end
end
