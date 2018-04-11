class Schedule < ApplicationRecord
  extend FriendlyId
  friendly_id :date, use: :slugged
  has_many :bookings

  belongs_to :location
end
