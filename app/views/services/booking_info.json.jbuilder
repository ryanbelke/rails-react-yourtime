# Specify the partial, as well as the name of the variable used in the partial
json.bookings(@booking_feed, partial: "appointments/appointment", as: :appointment)