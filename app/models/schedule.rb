class Schedule < ApplicationRecord
  extend FriendlyId
  friendly_id :date, use: :slugged

  belongs_to :category
end
