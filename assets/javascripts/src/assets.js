define(['react'], function(React) {
  return React.createClass({
    render: function() {
      return (
        <div className='jumbotron'>
          <div className='container'>
            <h1>This is Firecash</h1>
            <p>Simple personal finance service that doesn't require complicated and painstaking management of transactions and stuff.</p>
          </div>
        </div>
      );
    }
  })
});