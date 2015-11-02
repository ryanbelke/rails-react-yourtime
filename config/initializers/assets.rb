***REMOVED***

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = "1.0"

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Add client/assets/stylesheets to asset pipeline's search path.
Rails.application.config.assets.paths << Rails.root.join("client", "assets", "stylesheets")

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( generated/server-bundle.js )
