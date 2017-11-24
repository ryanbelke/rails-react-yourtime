class AddDefaultLocationToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :default_location, :integer
  end
end
