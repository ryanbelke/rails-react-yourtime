class Workplace < ApplicationRecord
  extend FriendlyId
  friendly_id :workplace_name, use: :slugged
  has_many :locations

  belongs_to :user
  default_scope -> { order(created_at: :asc) }

end
