class AddCategoryIdToServicesTable < ActiveRecord::Migration[5.1]
  def change
    add_column :services, :category_id, :integer
    add_index :services, :category_id
  end
end
