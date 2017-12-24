class Service < ApplicationRecord
  extend FriendlyId
  friendly_id :service_name, use: :slugged
  default_scope -> { order(created_at: :asc) }
  mount_uploader :picture, PictureUploader
  validate  :picture_size
  belongs_to :user
  belongs_to :category
  #Services will have my FOREIGN KEY to pull the USD ID AND CATEGORY ID


  private

  # Validates the size of an uploaded picture.
  def picture_size
    if picture.size > 5.megabytes
      errors.add(:picture, "should be less than 5MB")
    end
  end
end
