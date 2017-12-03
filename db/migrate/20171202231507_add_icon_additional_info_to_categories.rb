class AddIconAdditionalInfoToCategories < ActiveRecord::Migration[5.1]
  def change
    add_column :categories, :category_info, :string
    add_column :categories, :category_icon, :string
  end
end
