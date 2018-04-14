# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_04_14_191203) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "bookings", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "schedule_id"
    t.string "booking_status"
    t.string "booking_description"
    t.float "booking_price"
    t.date "booking_date"
    t.string "booking_location"
    t.string "stripe_id"
    t.string "services", array: true
    t.string "add_ons", array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "workplace_id"
    t.bigint "category_id"
    t.date "date"
    t.bigint "location_id"
    t.index ["schedule_id"], name: "index_bookings_on_schedule_id"
    t.index ["user_id"], name: "index_bookings_on_user_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "category_name"
    t.integer "workplace_id"
    t.string "category_description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.string "category_info"
    t.string "category_icon"
    t.date "category_date"
    t.integer "category_capacity"
    t.index ["workplace_id"], name: "index_categories_on_workplace_id"
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id"
    t.index ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type"
  end

  create_table "locations", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.string "location_name"
    t.string "location_address"
    t.string "location_description"
    t.bigint "workplace_id"
    t.integer "category_id"
    t.index ["workplace_id"], name: "index_locations_on_workplace_id"
  end

  create_table "microposts", id: :serial, force: :cascade do |t|
    t.text "content"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "picture"
    t.index ["user_id"], name: "index_microposts_on_user_id"
  end

  create_table "relationships", id: :serial, force: :cascade do |t|
    t.integer "follower_id"
    t.integer "followed_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["followed_id"], name: "index_relationships_on_followed_id"
    t.index ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true
    t.index ["follower_id"], name: "index_relationships_on_follower_id"
  end

  create_table "schedules", force: :cascade do |t|
    t.bigint "location_id"
    t.date "date"
    t.integer "date_capacity"
    t.integer "date_reserved"
    t.boolean "available"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.index ["location_id"], name: "index_schedules_on_location_id"
  end

  create_table "sections", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "location_id"
    t.string "section_name"
    t.string "section_description"
    t.string "slug"
    t.index ["location_id"], name: "index_sections_on_location_id"
  end

  create_table "services", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "location_id"
    t.bigint "section_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "service_name", null: false
    t.string "service_description", null: false
    t.decimal "service_price", precision: 5, scale: 2, null: false
    t.decimal "service_time_to_complete"
    t.string "service_vendor"
    t.string "slug"
    t.string "service_info"
    t.string "picture"
    t.integer "booking_id"
    t.decimal "service_tax", precision: 5, scale: 2
    t.decimal "yourtime_fee", precision: 2, scale: 2, default: "0.5", null: false
    t.boolean "add_on"
    t.index ["location_id"], name: "index_services_on_location_id"
    t.index ["section_id"], name: "index_services_on_section_id"
    t.index ["user_id"], name: "index_services_on_user_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.string "remember_digest"
    t.boolean "admin", default: false
    t.string "activation_digest"
    t.boolean "activated", default: false
    t.datetime "activated_at"
    t.string "reset_digest"
    t.datetime "reset_sent_at"
    t.string "first_name"
    t.string "last_name"
    t.string "address"
    t.string "city"
    t.string "state"
    t.integer "zip"
    t.integer "default_location"
    t.string "default_workplace"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "workplaces", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "workplace_name"
    t.string "workplace_address"
    t.string "workplace_description"
    t.bigint "location_id"
    t.string "slug"
    t.string "workplace_city"
    t.string "workplace_state"
    t.integer "workplace_zip"
    t.string "workplace_building_number"
    t.string "workplace_image"
    t.index ["location_id"], name: "index_workplaces_on_location_id"
    t.index ["user_id"], name: "index_workplaces_on_user_id"
  end

  add_foreign_key "locations", "workplaces"
  add_foreign_key "microposts", "users"
  add_foreign_key "workplaces", "locations"
end
