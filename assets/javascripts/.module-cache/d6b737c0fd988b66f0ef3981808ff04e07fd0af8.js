require(['react'], function(React) {
  return React.createClass({
    render: function() {
      // o hi
      var allPayments = this.props.payments.map(function(p) {
        return (
          <div className='row'>
            <div className='col-md-2'>{p.amount}</div>
            <div className='col-md-6'>{p.title}</div>
            <div className='col-md-4'>{p.category}</div>
          </div>
        );
      })
      return (
        <div className='payments'>
          {allPayments}
        </div>
      );
    }
  })
});