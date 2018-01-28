class AddInfoToAppointments < ActiveRecord::Migration[5.1]
  def change
    add_column :appointments, :workplace_id, :bigint
    add_column :appointments, :category_id, :bigint
  end
end
