class Schedule < ApplicationRecord
  extend FriendlyId
  friendly_id :date, use: :slugged
  has_many :appointments

  belongs_to :category
end
