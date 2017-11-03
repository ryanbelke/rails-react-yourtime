class ChangeAuthorAndTextToNotNull < ActiveRecord::Migration
  def change
    change_column_null(:purchasor, :author, false, "")
    change_column_null(:purchasor, :text, false, "")
  end
end
