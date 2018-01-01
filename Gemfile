source "https://rubygems.org"
ruby "2.4.1"

gem "react_on_rails", "10.0.0"
gem "webpacker", :github => 'rails/webpacker'

gem 'stripe'

gem 'bcrypt',                  '3.1.11'
gem 'faker',                   '1.7.3'

gem 'will_paginate',           '3.1.5'
gem 'bootstrap-will_paginate', '1.0.0'
gem 'bootstrap-sass',          '3.3.7'


gem 'jquery-rails',            '4.3.1'
gem 'turbolinks',              '5.0.1'
gem 'friendly_id', '~> 5.1.0'
gem 'figaro'
#image upload
gem 'carrierwave',             '1.1.0'
gem 'mini_magick',             '4.7.0'
gem 'fog-aws',                 '2.0.0'
gem 'nokogiri',                '1.8.1'
# Bundle edge Rails instead: gem "rails", github: "rails/rails"

gem "rails", "~> 5"

# Note: We're using sqllite3 for development and testing
# gem "sqlite3", group: [:development, :test]

gem "redis"

gem "puma"

# Use SCSS for stylesheets
gem "sass-rails"
# Use Uglifier as compressor for JavaScript assets
gem "uglifier"
# Use CoffeeScript for .js.coffee assets and views
gem "coffee-rails"

# Turbolinks makes following links in your web application faster.
# Read more: https://github.com/turbolinks/turbolinks
# Get turbolinks from npm!
# gem 'turbolinks', '>= 5.0.0.beta2'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem "jbuilder"

# bundle exec rake doc:rails generates the API under doc/api.
gem "sdoc", group: :doc

# Use ActiveModel has_secure_password
# gem "bcrypt", "~> 3.1.7"

# Use Rails Html Sanitizer for HTML sanitization
gem "rails-html-sanitizer"

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# mini_racer is probably faster than therubyracer
gem "mini_racer"

gem "autoprefixer-rails"

gem "awesome_print"

# jquery as the JavaScript library has been moved under /client and managed by npm.
# It is critical to not include any of the jquery gems when following this pattern or
# else you might have multiple jQuery versions.

group :development do
  # Access an IRB console on exceptions page and /console in development

  #Rails Tutorial
  gem 'web-console',           '3.5.1'
  gem 'listen',                '3.0.8'
  gem 'spring',                '2.0.2'
  gem 'spring-watcher-listen', '2.0.1'

end

group :development, :test do
  ################################################################################

  #Rails Tutorial
  gem 'sqlite3', '1.3.13'
  gem 'byebug',  '9.0.6', platform: :mri
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring

  gem "spring-commands-rspec"

  ################################################################################
  # Manage application processes
  gem "factory_girl_rails"
  gem "foreman"

  ################################################################################
  # Linters and Security
  gem "rubocop", require: false
  gem "ruby-lint", require: false
  # Critical that require: false be set! https://github.com/brigade/scss-lint/issues/278
  gem "brakeman", require: false
  gem "bundler-audit", require: false
  gem "scss_lint", require: false

  ################################################################################
  # Favorite debugging gems
  gem "pry"
  gem "pry-byebug"
  gem "pry-doc"
  gem "pry-rails"
  gem "pry-rescue"
  gem "pry-stack_explorer"

  ################################################################################
  # Color console output
  gem "rainbow"
end

group :test do
  gem "capybara"
  gem "capybara-screenshot"
  gem "capybara-webkit"
  gem "chromedriver-helper"
  gem "coveralls", require: false
  gem "database_cleaner"
  gem "generator_spec"
  gem "launchy"
  gem "poltergeist"
  gem "rspec-rails", "~> 3.6"
  gem "rspec-retry"
  gem "selenium-webdriver", "<3.0.0"

  #Rails Tutorial
  gem 'rails-controller-testing', '1.0.2'
  gem 'minitest-reporters',       '1.1.14'
  gem 'guard',                    '2.14.1'
  gem 'guard-minitest',           '2.4.6'

  group :production do
    gem 'pg', '0.20.0'
  end

  # Windows does not include zoneinfo files, so bundle the tzinfo-data gem
  gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
end
