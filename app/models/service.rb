class Service < ApplicationRecord
  extend FriendlyId
  friendly_id :service_name, use: :slugged
  default_scope -> { order(created_at: :asc) }
  mount_uploader :picture, PictureUploader
  #has_one_attached :picture
  validate  :picture_size

  #Services will have my FOREIGN KEY to pull the USD ID AND CATEGORY ID
  belongs_to :section

  private

  # Validates the size of an uploaded picture.
  def picture_size
    if picture.size > 5.megabytes
      errors.add(:picture, "should be less than 5MB")
    end
  end
end
