# Users
User.create!(name:  "Ryan Belke",
             email: "ryan@example.org",
             password:              "foobar",
             password_confirmation: "foobar",
             admin:     true,
             activated: true,
             activated_at: Time.zone.now,
             first_name: 'Ryan',
             last_name: 'Belke',
             address: '4902 Avenue F',
             city: 'Austin',
             state:'Texas',
             zip: '78751',
            )
User.create!(name:  "Ryan Belke",
             email: "noadmin@example.org",
             password:              "foobar",
             password_confirmation: "foobar",
             admin:     false,
             activated: true,
             activated_at: Time.zone.now,
             first_name: 'Ryan',
             last_name: 'Belke',
             address: '4902 Avenue F',
             city: 'Austin',
             state:'Texas',
             zip: '78751',
)

5.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+1}@example.org"
  password = "password"
  User.create!(name:  name,
               email: email,
               password:              password,
               password_confirmation: password,
               activated: true,
               activated_at: Time.zone.now)
end

Workplace.create!(workplace_name: 'Silicon Labs')
Workplace.create!(workplace_name: 'Spredfast')
Workplace.create!(workplace_name: 'Not Listed')

@workplace_silicon = Workplace.find_by id: 1
@workplace_spredfast = Workplace.find_by id: 2

@workplace_silicon.categories.create!(category_name: 'Car Wash', category_description: 'Description for car wash category')
@workplace_silicon.categories.create!(category_name: 'Auto Maintenance', category_description: 'Description for the auto/mechanic category')

@workplace_spredfast.categories.create!(category_name: 'Car Wash', category_description: 'Description auto/mechanic')
@workplace_spredfast.categories.create!(category_name: 'Auto Maintenance', category_description: 'Description auto/mechanic')
@workplace_spredfast.categories.create!(category_name: 'Haircuts', category_description: 'Description auto/mechanic')

@category1 = Category.find_by id: 1
@category2 = Category.find_by id: 2
@category3 = Category.find_by id: 3
@category4 = Category.find_by id: 4
@category5 = Category.find_by id: 5


@category1.services.create!(service_name: 'Basic Detail', service_description: 'interior')
@category1.services.create!(service_name: 'Premium Detail', service_description: 'interior')
@category1.services.create!(service_name: 'Deluxe Detail', service_description: 'interior')

@category1.services.create!(service_name: 'Basic Wash', service_description: 'exterior')
@category1.services.create!(service_name: 'Premium Wash', service_description: 'exterior')
@category1.services.create!(service_name: 'Deluxe Wash', service_description: 'exterior')

@category3.services.create!(service_name: 'Basic Detail', service_description: 'interior')
@category3.services.create!(service_name: 'Premium Detail', service_description: 'interior')
@category3.services.create!(service_name: 'Deluxe Detail', service_description: 'interior')

@category3.services.create!(service_name: 'Basic Wash', service_description: 'exterior')
@category3.services.create!(service_name: 'Premium Wash', service_description: 'exterior')
@category3.services.create!(service_name: 'Deluxe Wash', service_description: 'exterior')

@category4.services.create!(service_name: 'Routine Maintenance', service_description: 'routine')
@category4.services.create!(service_name: 'Major Mechanical', service_description: 'major')
@category4.services.create!(service_name: 'State Inspection', service_description: 'state')

@category5.services.create!(service_name: 'Mens', service_description: 'cut')
@category5.services.create!(service_name: 'Womens', service_description: 'cut')




@date = Date.strptime('11/14/2017','%m/%d/%Y')
@user = User.find_by id: 1
@user.appointments.create!(appointment_status: 'Pending', appointment_date: @date,
                          service_id: 1, appointment_price: '$29.99', appointment_location: 'Building 400')
@user.appointments.create!(appointment_status: 'Scheduled', appointment_date: @date,
                           service_id: 1, appointment_price: '$29.99', appointment_location: 'Building 400')
@user.appointments.create!(appointment_status: 'Error', appointment_date: @date,
                           service_id: 1, appointment_price: '$29.99', appointment_location: 'Building 400')
@user.appointments.create!(appointment_status: 'Completed', appointment_date: @date,
                           service_id: 1, appointment_price: '$29.99', appointment_location: 'Building 400')


# Service
=begin
users = User.order(:created_at).take(6)
20.times do |n|
  type = 'E85'
  gallons = n*2.345+5
  price = '2.25'
  users.each { |user| user.purchases.create!(fuel_type: type, gallons: gallons, price: price) }
end
=end

