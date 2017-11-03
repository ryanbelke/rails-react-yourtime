# Users
User.create!(name:  "Ryan Belke",
             email: "ryan@example.org",
             password:              "foobar",
             password_confirmation: "foobar",
             admin:     true,
             activated: true,
             activated_at: Time.zone.now,
             fuel_type: 'e85',
             total_gallons_remaining: 24,
             last_purchase_gallons: 100,
             last_purchase_price: 2.24,
             first_name: 'Ryan',
             last_name: 'Belke',
             address: '4902 Avenue F',
             city: 'Austin',
             state:'Texas',
             zip: '78751',
            )

5.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+1}@railstutorial.org"
  password = "password"
  User.create!(name:  name,
               email: email,
               password:              password,
               password_confirmation: password,
               activated: true,
               activated_at: Time.zone.now)
end

# Purchases
users = User.order(:created_at).take(6)
20.times do |n|
  type = 'E85'
  gallons = n*2.345+5
  price = '2.25'
  users.each { |user| user.purchases.create!(fuel_type: type, gallons: gallons, price: price) }
end

