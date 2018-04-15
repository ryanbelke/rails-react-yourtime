class RenameServicesServiceId < ActiveRecord::Migration[5.2]
  def change
    rename_column :bookings, :services, :service_id
  end
end
