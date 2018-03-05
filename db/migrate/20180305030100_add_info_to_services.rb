class AddInfoToServices < ActiveRecord::Migration[5.1]
  def change
    add_column :services, :service_name, :string
    add_column :services, :service_description, :string
    add_column :services, :service_price, :decimal
    add_column :services, :service_time_to_complete, :decimal
    add_column :services, :service_status, :string
    add_column :services, :service_purchased, :boolean
    add_column :services, :service_vendor, :string
    add_column :services, :slug, :string
    add_column :services, :service_info, :string
    add_column :services, :picture, :string
    add_column :services, :appointment_id, :integer
  end
end
