class AddInfoToServicesTable < ActiveRecord::Migration[5.1]
  def change
    add_column :services, :service_name, :string
    add_column :services, :service_description, :string
    add_column :services, :service_price, :string
    add_column :services, :service_time_to_complete, :integer
  end
end
