class AddFuelTypeToPurchases < ActiveRecord::Migration[5.1]
  def change
    add_column :purchases, :fuel_type, :string
  end
end
