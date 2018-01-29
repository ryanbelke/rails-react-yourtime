class AddLocationIdToSections < ActiveRecord::Migration[5.1]
  def change
    add_reference :sections, :location, index: true
  end
end
