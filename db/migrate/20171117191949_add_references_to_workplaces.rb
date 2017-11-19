class AddReferencesToWorkplaces < ActiveRecord::Migration[5.1]
  def change
    add_reference :workplaces, :user, foreign_key: true
  end
end
