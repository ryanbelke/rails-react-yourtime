class SchedulesDateToDatetime < ActiveRecord::Migration[5.2]
  def change
    change_column :schedules, :date, :date
  end
end
