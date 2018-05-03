class AddUnixToSchedules < ActiveRecord::Migration[5.2]
  def change
    add_column :schedules, :unix, :string
  end
end
