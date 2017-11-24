class CreateAppointments < ActiveRecord::Migration[5.1]
  def change
    create_table :appointments do |t|
      t.belongs_to :user, index: true
      t.belongs_to :service, index: true
      t.timestamps
    end
  end
end
