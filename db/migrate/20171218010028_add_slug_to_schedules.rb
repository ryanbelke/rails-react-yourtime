class AddSlugToSchedules < ActiveRecord::Migration[5.1]
  def change
    add_column :schedules, :slug, :string
  end
end
