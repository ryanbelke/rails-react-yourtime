class AddDiscountcodeToBooking < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :discount_code, :string
  end
end
