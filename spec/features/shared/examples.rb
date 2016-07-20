require "rails_helper"
require "features/shared/contexts"

shared_examples "New Comment Submission" do |expect_comment_count|
  context "when the new comment is submitted" do
    let(:name) { "John Smith" }
    let(:text) { "Hello there!" }
    include_context "Form Submitted", name: :name, text: :text

    scenario "comment is added" do
      expect(page).to have_css(".js-comment-author", text: name)
      expect(page).to have_css(".js-comment-text", text: text)
      if expect_comment_count
        expect(page).to have_css("#js-comment-count",
                                 text: "Comments: #{Comment.count}")
      end
    end
  end

  context "when the new comment is submmited with blank fields", blank_form_submitted: true do
    let!(:comments_count) { all(".comment").size }

    scenario "comment is not added" do
      expect(page).to have_selector(".comment", count: comments_count)
      if expect_comment_count
        expect(page).to have_css("#js-comment-count",
                                 text: "Comments: #{Comment.count}")
      end
    end
  end

  context "with iframe text" do
    let(:iframe_text) { "<iframe src=\"http://www.w3schools.com\"></iframe>" }
    include_context "Form Submitted", text: :iframe_text

    scenario "doesn't add an iframe" do
      expect(page).not_to have_css("iframe")
    end
  end
end
