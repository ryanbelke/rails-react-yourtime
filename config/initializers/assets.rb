***REMOVED***

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = "1.0"
#Added to precompile the custom css
Rails.application.config.assets.precompile += %w( application_static.css )