class AddStripeToAppointments < ActiveRecord::Migration[5.1]
  def change
    add_column :appointments, :stripe_id, :string
  end
end
