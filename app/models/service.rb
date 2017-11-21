class Service < ApplicationRecord
  belongs_to :user
  belongs_to :location
  #Services will have my FOREIGN KEY to pull the USD ID AND LOCATION ID
end
