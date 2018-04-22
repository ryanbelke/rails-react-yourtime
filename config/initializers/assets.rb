***REMOVED***

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )

***REMOVED***

# Version of your assets, change this if you want to expire all your assets.
#Added to precompile the custom css
Rails.application.config.assets.precompile += %w( application_static.css )

# Font Awesoe removed from asset pipleine, using CDN
#Rails.application.config.assets.precompile += %w( fontawesome-all.min.js )