class AddInfoToServices < ActiveRecord::Migration[5.1]
  def change
    add_column :services, :service_name, :string, null: false
    add_column :services, :service_description, :string, null: false
    add_column :services, :service_price, :decimal, precision: 5, scale: 2, null: false
    add_column :services, :service_time_to_complete, :decimal
    add_column :services, :service_vendor, :string
    add_column :services, :slug, :string
    add_column :services, :service_info, :string
    add_column :services, :picture, :string
    add_column :services, :booking_id, :integer
    add_column :services, :service_tax, :decimal, precision: 5, scale: 2
    add_column :services, :yourtime_fee, :decimal, scale: 2, precision: 2, null: false, default: 0.5

  end
end
