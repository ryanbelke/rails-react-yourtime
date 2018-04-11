class Booking < ApplicationRecord
  default_scope -> { order(created_at: :desc) }
  belongs_to :user
  belongs_to :schedule
  belongs_to :service
  belongs_to :location
  belongs_to :workplace
end
