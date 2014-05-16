/** @jsx React.DOM */
define(['react'], function(React) {
  return React.createClass({
    render: function() {
      return (
        React.DOM.div(null, React.DOM.h1(null, "o hai user"))
      );
    }
  });
});