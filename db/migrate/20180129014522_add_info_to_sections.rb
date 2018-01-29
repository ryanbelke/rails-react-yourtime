class AddInfoToSections < ActiveRecord::Migration[5.1]
  def change
    add_column :sections, :section_name, :string
    add_column :sections, :section_description, :string
  end
end
