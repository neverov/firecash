/** @jsx React.DOM */
define(['underscore', 'react'], function(_, React) {
  return React.createClass({

    render: function() {
      var payments = this.props.payments;

      var totals = {
        income: 0,
        expense: 0,
        profit: function() {
          return this.income + this.expense;
        },
        profitClass: function() {
          return this.profit() >= 0 ? 'payment-plus' : 'payment-minus';
        }
      };

      totals = _.reduce(payments, function(acc, p, id) {
        if (p.amount > 0) {
          acc.income += p.amount;
        } else {
          acc.expense += p.amount;
        };
        return acc;
      }, totals);

      return (
        <div className='row totals'>
          <div className='col-md-2'><strong>Income</strong>:</div>
          <div className='col-md-2'><span className='payment-plus'>{totals.income}</span></div>
          <div className='col-md-2'><strong>Expense</strong>:</div>
          <div className='col-md-2'><span className='payment-minus'>{totals.expense}</span></div>
          <div className='col-md-2'><strong>Profit</strong>:</div>
          <div className='col-md-2'><span className={totals.profitClass()}>{totals.profit()}</span></div>
        </div>
      );
    }
  });
});