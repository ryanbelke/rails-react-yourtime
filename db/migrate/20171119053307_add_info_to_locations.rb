class AddInfoToLocations < ActiveRecord::Migration[5.1]
  def change
    add_column :locations, :location_name, :string
    add_column :locations, :location_address, :string
    add_column :locations, :location_description, :string
    add_reference :locations, :workplace, foreign_key: true
  end
end
