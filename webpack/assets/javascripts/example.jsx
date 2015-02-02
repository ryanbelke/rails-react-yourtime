var React = require('react/addons');

import { CommentBox } from './CommentBox';

var $ = require('jquery');

var render = () => {
  if ($("#content").length > 0) {
    React.render(
      <div>
        <CommentBox url="comments.json" pollInterval={2000} />
        <div className="container">
          <a href="http://www.railsonmaui.com">
            <h3 className="open-sans-light">
              <div className="logo"/>
              Example of styling using image-url and Open Sans Light custom font
            </h3>
          </a>
        </div>
      </div>,
      document.getElementById('content')
    );
  }
};

$(function() {
  render();
  // Next part is to make this work with turbo-links
  $(document).on("page:change", () => {
    render();
  });
});
