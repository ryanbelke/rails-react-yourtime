class Location < ApplicationRecord
  extend FriendlyId
  friendly_id :location_name, use: :slugged

  belongs_to :category
  has_many :services
  has_many :schedules
end
