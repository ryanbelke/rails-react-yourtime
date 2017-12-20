class AddDateCapacityToCategories < ActiveRecord::Migration[5.1]
  def change
    add_column :categories, :category_date, :date
    add_column :categories, :category_capacity, :integer
  end
end
