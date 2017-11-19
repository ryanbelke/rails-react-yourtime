class Workplace < ApplicationRecord
  extend FriendlyId
  friendly_id :slug, use: :slugged

  belongs_to :user
  default_scope -> { order(created_at: :asc) }

end
