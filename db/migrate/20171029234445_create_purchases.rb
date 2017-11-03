class CreatePurchases < ActiveRecord::Migration[5.1]
  def change
    create_table :purchases do |t|
      t.integer :user_id
      t.references :user, foreign_key: true
      t.timestamps
    end
    add_index :purchases, [:user_id, :created_at]
  end
end
