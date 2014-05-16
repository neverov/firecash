/** @jsx React.DOM */
define(['react', 'firebase', 'firebase-simple-login', 'global', 'routes'], function(React, Firebase, FirebaseSimpleLogin, Global, Routes) {
  return React.createClass({
    login: function(e) {
      var email = this.refs.email.getDOMNode().value;
      var password = this.refs.password.getDOMNode().value
      this.props.onLogin('password', email, password);
      return false;
    },
    loginFB: function(e) {
      this.props.onLogin('facebook');
    },
    logout: function(e) {
      this.props.onLogout();
    },

    render: function() {
      return (
        <nav className='navbar navbar-inverse navbar-fixed-top' role='navigation'>
          <div className='container'>
            <div className='navbar-header'>
              <a className='navbar-brand' href='#'>Firecash</a>
            </div>
           
              {function(self) {
                if (self.props.user) {
                  return (
                    <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                      <li className={self.props.active === 'activity' ? 'active' : ''}><a href={Routes.activity}>Activity</a></li>
                      <li className={self.props.active === 'report' ? 'active' : ''}><a href={Routes.report}>Report</a></li>
                      <li className={self.props.active === 'regular' ? 'active' : ''}><a href={Routes.regular}>Regular</a></li>
                      <li className={self.props.active === 'assets' ? 'active' : ''}><a href={Routes.assets}>Assets</a></li>
                    </ul>
                    <ul className='nav navbar-nav navbar-right'>
                      <li><a href={Routes.user}>{self.props.user.email}</a></li>
                      <li><a href={Routes.logout} onClick={self.logout}>logout</a></li>
                    </ul>
                    </div>
                  );
                } else if (self.props.loading) {
                  <div className='navbar-collapse collapse'>
                  <ul className='nav navbar-nav navbar-right'>
                    <li>Loading...</li>
                  </ul>
                  </div>
                } else {
                  return (
                    <div className='navbar-collapse collapse'>
                    <div className='navbar-right'>
                    <form className='navbar-form navbar-right' role='form' onSubmit={self.login}>
                      <div className='form-group'>
                        <input type='text' placeholder='Email' className='form-control' ref='email'/>
                      </div>
                      <div className='form-group'>
                        <input type='password' placeholder='Password' className='form-control' ref='password'/>
                      </div>
                      <button type='submit' className='btn btn-success'>Login</button>
                      <button type='button' className='btn btn-primary' onClick={self.loginFB}>Login with FB</button>
                    </form>
                    </div>
                    </div>
                  );  
                } 
              }(this)}     
          </div>
        </nav>
      );
    }
  });
});