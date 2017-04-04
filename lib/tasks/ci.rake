if Rails.env.development? || Rails.env.test?
  # See tasks/linters.rake

  task :bundle_audit do
    puts Rainbow("Running security audit on gems (bundle_audit)").green
    Rake::Task["bundle_audit"].invoke
  end

  task :security_audit do
    puts Rainbow("Running security audit on code (brakeman)").green

    sh "brakeman --exit-on-warn --quiet -A -z"
  end

  task :js_tests do
    puts Rainbow("Running JavaScript tests").green
    sh "yarn run ***REMOVED***client"
  end

  task :rspec_tests do
    puts Rainbow("Running RSpec tests").green
    sh "rspec"
  end

  namespace :ci do
    desc "Run all audits and tests"
    # rspec_tests must be before lint and js_tests to build the locale files
    task all: [:environment, :rspec_tests, :lint, :js_tests, :bundle_audit, :security_audit] do
      begin
        puts "All CI tasks"
        puts Rainbow("PASSED").green
        puts ""
      rescue Exception => e
        puts "#{e}"
        puts Rainbow("FAILED").red
        puts ""
        raise(e)
      end
    end
  end

  task ci: "ci:all"

  task(:default).clear.enhance([:ci])
end
