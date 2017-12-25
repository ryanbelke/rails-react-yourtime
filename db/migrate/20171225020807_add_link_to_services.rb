class AddLinkToServices < ActiveRecord::Migration[5.1]
  def change
    add_column :services, :link, :string
  end
end
