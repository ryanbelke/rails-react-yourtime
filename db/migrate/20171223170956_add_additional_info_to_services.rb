class AddAdditionalInfoToServices < ActiveRecord::Migration[5.1]
  def change
  add_column :services, :service_info, :string
  end
end
