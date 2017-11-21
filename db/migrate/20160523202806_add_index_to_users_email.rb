class AddIndexToUsersEmail < ActiveRecord::Migration[5.0]
  def change
    add_index :users, :email, unique: true

    add_column :users, :password_digest, :string
    add_column :users, :remember_digest, :string
    add_column :users, :admin, :boolean, default: false
    add_column :users, :activation_digest, :string
    add_column :users, :activated, :boolean, default: false
    add_column :users, :activated_at, :datetime
    add_column :users, :reset_digest, :string
    add_column :users, :reset_sent_at, :datetime

    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :address, :string
    add_column :users, :city, :string
    add_column :users, :state, :string
    add_column :users, :zip, :integer
  end
end
