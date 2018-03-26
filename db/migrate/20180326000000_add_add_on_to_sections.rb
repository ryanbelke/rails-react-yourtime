class AddAddOnToSections < ActiveRecord::Migration[5.1]
  def change
    add_column :services, :add_on, :boolean
  end
end
