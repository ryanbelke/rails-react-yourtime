class AddDiscountsToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :discounts, :string, array: true
  end
end
