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


@workplace_silicon.locations.create!(location_name: 'Building 400', location_address: '450 West Cesar Chavez',
                                    location_description: 'Description for building 400')
@workplace_silicon.locations.create!(location_name: 'Building 600', location_address: '450 West Cesar Chavez',
                                     location_description: 'Description for building 600')
@workplace_spredfast.locations.create!(location_name: 'Building 1000', location_address: '350 West Cesar Chavez',
                                     location_description: 'Description for building 1000')
@location1 = Location.find_by id: 1
@location2 = Location.find_by id: 2

@location1.services.create!(service_name: 'Oil Change', service_description: 'Change the oil')
@location1.services.create!(service_name: 'Radiator Flush', service_description: 'Flush the radiator')

@location2.services.create!(service_name: 'Tire Rotation', service_description: 'Roate The Tires')
@location2.services.create!(service_name: 'Oil Change', service_description: 'Chang the oil')


@date = Date.parse('2017-11-14')
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

