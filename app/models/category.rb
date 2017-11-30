class Category < ApplicationRecord
  extend FriendlyId
  friendly_id :category_name, use: :slugged

  has_many :services
  belongs_to :workplace
end
