/** @jsx React.DOM */
define(['underscore', 'react'], function(_, React) {
  return React.createClass({
    
    startRowEdit: function(e) {
      this.setState
      console.log(e);
    },

    render: function() {
      var payments = _.map(this.props.payments, function(p, id) {
        var paymentClasses = React.addons.classSet({
          'payment-plus': p.amount > 0,
          'payment-minus': p.amount < 0
        });
        return (
          <tr className='payment-row' key={id} onClick={this.startRowEdit}>
            <td className={paymentClasses}>{p.amount}</td>
            <td>{p.title}</td>
            <td>{p.category}</td>
          </tr>
        );
      }.bind(this)); 

      return (
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Title</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {payments}
          </tbody>
        </table>
      );
    }
  })
});