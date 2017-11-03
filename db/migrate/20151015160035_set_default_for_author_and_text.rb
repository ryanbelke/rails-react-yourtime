class SetDefaultForAuthorAndText < ActiveRecord::Migration
  def up
    change_column_default(:purchasor, :author, "")
    change_column_default(:purchasor, :text, "")
  end

  def down
    change_column_default(:purchasor, :author, nil)
    change_column_default(:purchasor, :text, nil)
  end
end
