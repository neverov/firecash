/** @jsx React.DOM */
define(['react'], function(React) {
  return React.createClass({
    render: function() {
      var allPayments = this.props.payments.map(function(p) {
        return (
          React.DOM.div( {className:"row"}, 
            React.DOM.div( {className:"col-md-2"}, p.amount),
            React.DOM.div( {className:"col-md-6"}, p.title),
            React.DOM.div( {className:"col-md-4"}, p.category)
          )
        );
      })
      return (
        React.DOM.div( {className:"payments"}, 
          allPayments
        )
      );
    }
  })
});