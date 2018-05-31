import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import * as actions from '../actions/loginActions';
import Header from '../components/Header';
import { store } from '../store';
// import bugsnagClient from '../index';

class MainComponent extends Component {
  constructor(props) {
    super(props);
    // this.logout = this.logout.bind(this);
    // this.profile = this.profile.bind(this);
    this.state = { error: false };
  }

  componentDidMount() {

  }


  componentWillReceiveProps(nextProps) {
    if (nextProps && JSON.stringify(nextProps.user) === '{}') {
      browserHistory.push('/');
    }
  }

  componentDidCatch(error, info) {
    console.log('error', error, 'info', info);
    this.setState({ error });
    // bugsnagClient.notify(new Error(error));
  }


  render() {
    if (this.state.error) {
      return (<h2>Error: Something wrong happened. Refresh page or Please report to support </h2>);
    }

    return (
      <div>
        <Header logout={this.logout} profile={this.profile} loggedInUser={this.props.user} />
        {this.props.children}
        {
          this.props.isLoading > 0 ? <Snackbar
            open
            message={this.props.message}
            autoHideDuration={3000}
            onRequestClose={() => { this.handleRequestClose(this.props); }}
          /> : null
        }
      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    user: state.loginReducer.user,
    error: state.loginReducer.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
