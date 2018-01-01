class AddLocationToCategories < ActiveRecord::Migration[5.1]
  def change
    add_column :locations, :category_id, :integer
  end
end
