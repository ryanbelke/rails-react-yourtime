class AddStatusToServicesTable < ActiveRecord::Migration[5.1]
  def change
    add_column :services, :service_status, :string
    add_column :services, :service_purchased, :boolean
    add_column :services, :service_vendor, :string
  end
end
