class CreateSchedules < ActiveRecord::Migration[5.1]
  def change
    create_table :schedules do |t|
        t.belongs_to :location, index: true
        t.date :date
        t.integer :date_capacity, default: 0
        t.integer :date_reserved, default: 0
        t.boolean :available

      t.timestamps
    end
  end
end
