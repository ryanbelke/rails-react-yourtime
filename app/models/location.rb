class Location < ApplicationRecord
  extend FriendlyId
  friendly_id :location_name, use: :slugged
  has_many :services
  has_many :workplaces
  has_many :users, through: :services
  has_many :appointments, through: :services
end
