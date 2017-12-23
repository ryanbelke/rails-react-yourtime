class CreateSchedules < ActiveRecord::Migration[5.1]
  def change
    create_table :schedules do |t|
        t.belongs_to :category, index: true
        t.date :date
        t.integer :date_capacity
        t.integer :date_reserved
        t.boolean :available

      t.timestamps
    end
  end
end
