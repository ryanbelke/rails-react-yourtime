class Location < ApplicationRecord
  belong_to :workplace
  has_many :services
end
