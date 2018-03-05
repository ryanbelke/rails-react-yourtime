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


Workplace.create!(workplace_name: 'Spredfast')
Workplace.create!(workplace_name: 'Not Listed')


@workplace_spredfast = Workplace.find_by id: 1

content = Faker::Lorem.paragraph(sentence_count = 3)

@workplace_spredfast.categories.create!(category_name: 'Car Wash', category_description: content, category_info: content, category_icon: 'fa-car')
@workplace_spredfast.categories.create!(category_name: 'Auto Maintenance', category_description: content, category_info: content, category_icon: 'fa-cog')
@workplace_spredfast.categories.create!(category_name: 'Haircuts', category_description: content, category_info: content, category_icon: 'fa-cut')

@category1 = Category.find_by id: 1
@category2 = Category.find_by id: 2
@category3 = Category.find_by id: 3

@category1.locations.create!(location_name: 'Building #400', location_description: 'Building 400 is located downtown Austin, Tx')
@category2.locations.create!(location_name: 'Building #400', location_description: 'Building 400 is located downtown Austin, Tx')
@category3.locations.create!(location_name: 'Building #400', location_description: 'Building 400 is located downtown Austin, Tx')


@category1.locations.create!(location_name: 'Building #600', location_description: 'Building 600 is located downtown Austin, Tx')
@category2.locations.create!(location_name: 'Building #600', location_description: 'Building 600 is located downtown Austin, Tx')
@category3.locations.create!(location_name: 'Building #600', location_description: 'Building 600 is located downtown Austin, Tx')

@location1 = Location.find_by id: 1
@location2 = Location.find_by id: 2
@location3 = Location.find_by id: 3
@location4 = Location.find_by id: 4
@location5 = Location.find_by id: 5
@location6 = Location.find_by id: 6

#car washes
@location1.sections.create!(section_name: 'Interior')
@location1.sections.create!(section_name: 'Exterior')
#auto Maintaince
@location2.sections.create!(section_name: 'State Inspection')
@location2.sections.create!(section_name: 'Major Repair')
#Haircuts
@location3.sections.create!(section_name: 'Mens')
@location3.sections.create!(section_name: 'Womens')

#car washes
@location4.sections.create!(section_name: 'Interior')
@location4.sections.create!(section_name: 'Exterior')
#auto Maintaince
@location5.sections.create!(section_name: 'State Inspection')
@location5.sections.create!(section_name: 'Major Repair')
#Haircuts
@location6.sections.create!(section_name: 'Mens')
@location6.sections.create!(section_name: 'Womens')


@section1 = Section.find_by id: 1
@section1.services.create!(service_name: 'Basic Detail', service_description: content, service_price: 29.99)
@section1.services.create!(service_name: 'Premium Detail', service_description: content, service_price: 39.99)
@section1.services.create!(service_name: 'Delux Detail', service_description: content, service_price: 59.99)

@section2 = Section.find_by id: 2
@section1.services.create!(service_name: 'Basic Wash', service_description: content, service_price: 29.99)
@section1.services.create!(service_name: 'Premium Wash', service_description: content, service_price: 39.99)
@section1.services.create!(service_name: 'Deluxe Wash', service_description: content, service_price: 59.99)





@date = Date.strptime('11/14/2017','%m/%d/%Y')
@user = User.find_by id: 1
