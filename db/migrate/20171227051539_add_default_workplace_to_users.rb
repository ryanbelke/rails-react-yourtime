class AddDefaultWorkplaceToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :default_workplace, :string
  end
end
