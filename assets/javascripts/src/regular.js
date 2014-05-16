define(['react', 'jsx!src/totals', 'jsx!src/payments', 'jsx!src/payment_form'], function(React, Totals, Payments, PaymentForm) {
  return React.createClass({
    render: function() {
      return (
        <div className='container'>
          <Totals payments={this.props.payments} />
          <Payments payments={this.props.payments} />
          <PaymentForm createPayment={this.props.createPayment} />
        </div>
      );
    }
  });
});