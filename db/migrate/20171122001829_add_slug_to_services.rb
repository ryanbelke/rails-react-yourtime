class AddSlugToServices < ActiveRecord::Migration[5.1]
  def change
    add_column :services, :slug, :string
  end
end
