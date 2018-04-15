class ChangeColumnSchedulesCapacity < ActiveRecord::Migration[5.2]
  def change
    change_column :schedules, :date_capacity, :integer, default: 0
    change_column :schedules, :date_reserved, :integer, default: 0
  end
end
