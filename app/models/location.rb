class Location < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :workplace
  has_many :services
end
