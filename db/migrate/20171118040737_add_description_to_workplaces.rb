class AddDescriptionToWorkplaces < ActiveRecord::Migration[5.1]
  def change
    add_column :workplaces, :workplace_description, :string
  end
end
