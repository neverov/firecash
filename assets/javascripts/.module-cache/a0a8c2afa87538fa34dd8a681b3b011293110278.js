/** @jsx React.DOM */
define(['react'], function(React) {
  return React.createClass({
    render: function() {
      return (
        React.DOM.div( {className:"top-header"}, React.DOM.h3(null, "o hai ", this.props.user.email))
      );
    }
  });
});