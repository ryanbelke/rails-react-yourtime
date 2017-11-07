class AddFuelTypeToPurchases < ActiveRecord::Migration[5.1]
  def change
    add_column :purchases, :fuel_type, :string
    add_column :purchases, :gallons, :float
    add_column :purchases, :price, :float

  end
end
