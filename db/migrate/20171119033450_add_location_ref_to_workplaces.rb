class AddLocationRefToWorkplaces < ActiveRecord::Migration[5.1]
  def change
    add_reference :workplaces, :location, foreign_key: true
  end
end
