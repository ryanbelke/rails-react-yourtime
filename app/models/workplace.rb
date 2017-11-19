class Workplace < ApplicationRecord
  belongs_to :user
  default_scope -> { order(created_at: :asc) }

end
