class AddMoreUserDetails < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :pin, :string
    add_column :users, :total_gallons_remaining, :integer
    add_column :users, :last_purchase_gallons, :integer
    add_column :users, :last_purchase_price, :integer
  end
end
