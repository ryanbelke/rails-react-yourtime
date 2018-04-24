class CreateDiscounts < ActiveRecord::Migration[5.2]
  def change
    create_table :discounts do |t|
      t.string :discount_name
      t.string :discount_code
      t.decimal :discount_price, default: nil, precision: 5, scale: 2
      t.decimal :discount_percent, default: nil, precision: 5, scale: 2
      t.string :discount_type
    end
  end
end
