class Discount < ApplicationRecord
  def discount_code=(s)
    write_attribute(:discount_code, s.to_s.upcase!)
  end
end
