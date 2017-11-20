class AddDescriptionToWorkplaces < ActiveRecord::Migration[5.1]
  def change
    add_column :workplaces, :workplace_name, :string
    add_column :workplaces, :workplace_address, :string
    add_column :workplaces, :workplace_description, :string
  end
end
