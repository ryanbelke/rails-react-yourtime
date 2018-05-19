class AddAddOnToServices < ActiveRecord::Migration[5.2]
  def change
    add_column :services, :add_on, :boolean, null: false, default: false
  end
end
