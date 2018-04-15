class Booking < ApplicationRecord
  default_scope -> { order(created_at: :desc) }
  belongs_to :user
  belongs_to :schedule

  has_many :services
end
