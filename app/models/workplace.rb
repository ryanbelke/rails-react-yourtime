class Workplace < ApplicationRecord
  extend FriendlyId
  friendly_id :workplace_name, use: :slugged

  #select cateoory after workplace
  has_many :categories, dependent: :destroy
  has_many :locations, dependent: :destroy
  belongs_to :user, optional: true
  default_scope -> { order(created_at: :asc) }

end
