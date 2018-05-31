import React, { Component } from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import { store, persistor } from './store';
import LoginContainer from './containers/LoginContainer';
import MainContainer from './containers/MainContainer';
import AdminContainer from './containers/AdminContainer';

import DashboaradContainer from './containers/DashboaradContainer';
import NotFound from './containers/NotFound';


class App extends Component {
  requireAuth(nextState, replace) {
    replace({
      pathname: '/home/admin/dashboard',
    });
  }


  render() {
    return (
      <MuiThemeProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            {/* <HttpsRedirect> */}
            <Router history={browserHistory}>
              <Route path="/" >
                <IndexRoute component={LoginContainer} onEnter={this.requireAuth} />
                <Route path="/home" component={MainContainer} >
                  <Route path="admin" component={AdminContainer} >
                    <Route path="dashboard" component={DashboaradContainer} />
                  </Route>
                </Route>
                <Route path="*" component={NotFound} />
              </Route>
            </Router>
            {/* </HttpsRedirect> */}
          </Provider>
        </PersistGate>
      </MuiThemeProvider>
    );
  }
}

export default App;
