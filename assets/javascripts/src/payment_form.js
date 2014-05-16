/** @jsx React.DOM */
define(['react'], function(React) {
  return React.createClass({
    getInitialState: function() {
      return { 
        amount: null,
        amountClass: 'form-group',
        titleClass: 'form-group',
        categoryClass: 'form-group'
      };
    },
    cleanForm: function() {
      this.setState({ amount: '' });
      this.refs.title.getDOMNode().value = '';
      this.refs.category.getDOMNode().value = '';
    },
    onAmountChange: function(e) {
      this.setState({ amount: event.target.value.replace(/[^-.\d]/, '') });
    },
    onAmountFocus: function(e) {
      this.setState({ amountClass: 'form-group' });
    },
    onTitleFocus: function(e) {
      this.setState({ titleClass: 'form-group' });
    },
    onCategoryFocus: function(e) {
      this.setState({ categoryClass: 'form-group' });
    },
    onSubmit: function(e) {
      var hasErrors = false;
      if (!this.refs.amount.getDOMNode().value) {
        this.setState({ amountClass: 'form-group has-error' });
        hasErrors = true;
      }  
      if (!this.refs.title.getDOMNode().value) {
        this.setState({ titleClass: 'form-group has-error' });
        hasErrors = true;
      }
      if (!this.refs.category.getDOMNode().value) {
        this.setState({ categoryClass: 'form-group has-error' });
        hasErrors = true;
      }
      if (!hasErrors) {
        var payment = {
          amount: parseFloat(this.refs.amount.getDOMNode().value),
          title: this.refs.title.getDOMNode().value.trim(),
          category: this.refs.category.getDOMNode().value.trim()        
        };
        this.props.createPayment(payment);
        this.cleanForm();
      }
      return false;
    },

    render: function() {
      var marginStyle = { marginLeft: '10px'};
      return (
        <div className='container payment-form'>
          <form className='form-inline' role='form' onSubmit={this.onSubmit}>
            <div className={this.state.amountClass}>
              <label className='sr-only'>Amount</label>
              <input type='text' className='form-control' placeholder='Amount' ref='amount' 
                  value={this.state.amount} onFocus={this.onAmountFocus} onChange={this.onAmountChange}/>
            </div>
            <div className={this.state.titleClass} style={marginStyle}>
              <label className='sr-only'>Title</label>
              <input type='text' className='form-control' placeholder='Title' ref='title' 
                  onFocus={this.onTitleFocus}/>
            </div>
            <div className={this.state.categoryClass} style={marginStyle}>
              <label className='sr-only'>Category</label>
              <input type='text' className='form-control' placeholder='Category' ref='category' 
                  onFocus={this.onCategoryFocus}/>
            </div>
            <div className='form-group' style={marginStyle}>
              <button type='submit' className='btn btn-default'><span className='glyphicon glyphicon-plus'></span> Add payment</button>
            </div> 
          </form>                   
        </div>
      );
    }
  });
});