class AddPriceToApp < ActiveRecord::Migration[5.1]
  def change
    add_column :appointments, :appointment_price, :string
  end
end
