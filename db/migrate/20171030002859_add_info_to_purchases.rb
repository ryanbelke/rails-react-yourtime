class AddInfoToPurchases < ActiveRecord::Migration[5.1]
  def change
    add_column :purchases, :gallons, :integer
    add_column :purchases, :fuel_type, :string
    add_column :purchases, :price, :integer
  end
end
