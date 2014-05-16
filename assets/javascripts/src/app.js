define(['react',
        'firebase-simple-login',
        'director',
        'routes',
        'jsx!src/header',
        'jsx!src/activity',
        'jsx!src/regular',
        'jsx!src/assets',
        'jsx!src/promo'], function(React, FirebaseSimpleLogin, Router, Routes, Header, Activity, Regular, Assets, Promo) {
  return React.createClass({
    // REACT
    getInitialState: function() {
      return {
        user: null,
        auth: null,
        loading: false,
        active: null
      };
    },
    componentWillMount: function() {
      this.setState({ loading: true });
      var auth = new FirebaseSimpleLogin(this.props.firebase, function(error, user) {
        this.setState({ loading: false });
        if (error) {
          console.log('login error: ' + error);
        } else {
          if (user) {
            console.log('logged in: %o', user);

            var userRef = this.props.firebase.child('users').child(user.email.replace(/\./g, ','));
            this.setState({
              dbRef: userRef,
              regularRef: userRef.child('regular')
            });
            this.state.regularRef.on('value', function(regular) {
              this.setState({ regular: regular.val() });
            }.bind(this));

            this.setState({ user: user });
          } else {
            console.log('logged out');
            this.setState({ user: null });
          }
        }
      }.bind(this));
      this.setState({ auth: auth });
    },
    componentDidMount: function() {
      var router = Router({
        '/': this.setState.bind(this, {active: 'activity'}),
        '/activity': this.setState.bind(this, {active: 'activity'}),
        '/report': this.setState.bind(this, {active: 'report'}),
        '/regular': this.setState.bind(this, {active: 'regular'}),
        '/assets': this.setState.bind(this, {active: 'assets'})
      });
      router.init();
    },
    // callbacks
    onLogin: function(loginType, email, password) {
      this.setState({ loading: true });
      if (loginType == 'facebook') {
        this.state.auth.login('facebook', {
          rememberMe: true
        });
      } else {
        this.state.auth.login('password', {
          email: email,
          password: password,
          rememberMe: true,
          scope: 'email'
        });
      }
    },
    onLogout: function() {
      this.state.auth.logout();
    },
    createPayment: function(payment) {
      this.state.regularRef.push(payment);
    },
    // RENDER
    render: function() {
      var routes = {
        activity: <Activity payments={this.state.payments} regular={this.state.regular}/>,
        report: <div>Report</div>,
        regular: <Regular payments={this.state.regular} createPayment={this.createPayment} />,
        assets: <Assets dbRef={this.state.dbRef} />
      };

      return (
        <div>
          <Header user={this.state.user} loading={this.state.loading} onLogin={this.onLogin} onLogout={this.onLogout} active={this.state.active}/>

          <div className='main-content'>
          {this.state.loading ?
            (<div className='jumbotron'>
              <div className='container'>
              <h1>Firecash is loading your data...</h1>
              </div>
            </div>)
            :
            (<div>
              {this.state.user ? routes[this.state.active] : <Promo />}
            </div>)
          }
          </div>
        </div>
      );
    }
  });
});
