class CreateBookingsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :bookings do |t|
      t.belongs_to :user, index: true
      t.belongs_to :schedule, index: true

      t.string :booking_status
      t.string :booking_description
      t.float :booking_price
      t.date :booking_date
      t.string :booking_location
      t.string :stripe_id
      t.string :services, array: true
      t.string :add_ons, array: true
      t.timestamps
    end
  end
end
