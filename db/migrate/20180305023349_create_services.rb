class CreateServices < ActiveRecord::Migration[5.1]
  def change
    create_table :services do |t|
      t.belongs_to :user, index: true
      t.belongs_to :location, index: true
      t.belongs_to :section, index: true
      t.timestamps
    end
  end
end
