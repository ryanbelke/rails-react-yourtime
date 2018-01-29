class Section < ApplicationRecord
  extend FriendlyId
  friendly_id :section_name, use: :slugged

  belongs_to :location
  has_many :services, dependent: :destroy
end
