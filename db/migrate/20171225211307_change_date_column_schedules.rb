class ChangeDateColumnSchedules < ActiveRecord::Migration[5.1]
  def change
    change_column :schedules, :date, :datetime
  end
end
