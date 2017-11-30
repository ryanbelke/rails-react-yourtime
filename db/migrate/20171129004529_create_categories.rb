class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :categories do |t|
      t.string :category_name
      t.integer :workplace_id
      t.string :category_description

      t.timestamps
    end
    add_index :categories, :workplace_id
  end
end
