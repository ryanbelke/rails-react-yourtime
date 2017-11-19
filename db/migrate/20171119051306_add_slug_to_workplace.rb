class AddSlugToWorkplace < ActiveRecord::Migration[5.1]
  def change
    add_column :workplaces, :slug, :string, unique: true
  end
end
