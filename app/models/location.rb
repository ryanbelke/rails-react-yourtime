class Location < ApplicationRecord
  extend FriendlyId
  friendly_id :location_name, use: :slugged

  belongs_to :category
  has_many :appointments
  has_many :services, dependent: :destroy
  has_many :schedules, dependent: :destroy


end
