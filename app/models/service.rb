class Service < ApplicationRecord
  extend FriendlyId
  friendly_id :service_name, use: :slugged

  belongs_to :user
  belongs_to :location
  #Services will have my FOREIGN KEY to pull the USD ID AND LOCATION ID
end
