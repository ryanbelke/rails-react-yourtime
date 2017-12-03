class AddCityStateZipToWorkplaces < ActiveRecord::Migration[5.1]
  def change
    add_column :workplaces, :workplace_city, :string
    add_column :workplaces, :workplace_state, :string
    add_column :workplaces, :workplace_zip, :integer
    add_column :workplaces, :workplace_building_number, :string
    add_column :workplaces, :workplace_image, :string
  end
end
