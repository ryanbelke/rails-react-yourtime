class CreateAppointmentsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :appointments do |t|
      t.belongs_to :user, index: true
      t.belongs_to :service, index: true
      #t.belongs_to :location, index: true
      t.belongs_to :schedule, index: true

      t.string :appointment_status
      t.string :appointment_description
      t.integer :appointment_price
      t.date :appointment_date
      t.string :appointment_location
      t.timestamps
    end
  end
end
