class Purchase < ApplicationRecord
    belongs_to :user
    default_scope -> { order(created_at: :desc) }
    #validate type, gallons, price
    validates :user_id, presence: true
    validates :fuel_type, presence: true
    validates :gallons, presence: true
    validates :price, presence: true

end
