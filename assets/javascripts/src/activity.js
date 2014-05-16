define(['react', 'moment', 'underscore'], function(React, moment, _) {
  return React.createClass({

    getInitialState: function() {
      return {
        month: moment().format('MMMM'),
        weekstart: moment().startOf('week').format('DD.MM'),
        weekend: moment().endOf('week').format('DD.MM'),
        dateSort: 'desc'
      };
    },

    sortByDate: function() {
      this.setState({ dateSort: this.state.dateSort == 'asc' ? 'desc' : 'asc' });
    },

    render: function() {
      var fake = {
        '1': {
          amount: 1000,
          date: moment('2014-02-08'),
          title: 'some payment 1'
        },
        '2': {
          amount: 2000,
          date: moment('2014-03-09'),
          title: 'some payment 2'
        },
        '3': {
          amount: 3000,
          date: moment('2014-01-10'),
          title: 'some payment 3'
        },
        '4': {
          amount: 4000,
          date: moment('2014-03-11'),
          title: 'some payment 4'
        },
        '5': {
          amount: 1500,
          date: moment('2014-03-03'),
          title: 'some payment 5'
        }
      };
      var payments = _.chain(fake)
        .filter(function(p, id) { return p.date.month() == moment().month(); })
        .sortBy(function(p) { return this.state.dateSort == 'asc' ? p.date : -p.date; }.bind(this))
        .value();
      var weekly = _.reduce(this.props.regular, function(acc, r) { return acc += r.amount; }, 0.0) * 0.9 / 4;  
      var spendings = _.reduce(payments, function(acc, p) { return acc += p.amount; }, 0); 
      var balance = weekly - spendings;
      return (
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'><h1>{this.state.month}</h1></div>
            <div className='col-md-8'>
              <h1> 
                <a href='#' className='week-link' onClick={this.weekPrev}> prev </a>
                {this.state.weekstart} – {this.state.weekend}
                <a href='#' className='week-link' onClick={this.weekNext}> next </a>
              </h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'><h3>package: {weekly}</h3></div>
            <div className='col-md-4'><h3>current spending: {spendings}</h3></div>
            <div className='col-md-4'><h3>balance: <span className={balance > 0 ? 'payment-plus' : 'payment-minus'}>{balance}</span></h3></div>
          </div>

          <table className='table table-hover'>
            <thead>
              <tr>
                <th>Amount</th>
                <th className='pointer' onClick={this.sortByDate}>Date 
                  <span className={this.state.dateSort == 'asc' ? 'caret caret-up' : 'caret'}></span>
                </th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(function(p) {
                return (
                  <tr>
                    <td>{p.amount}</td>
                    <td>{p.date.format('DD.MM.YYYY')}</td>
                    <td>{p.title}</td>
                  </tr>
                ); 
              })}
            </tbody>
          </table>
        </div>
      );
    }
  });
});