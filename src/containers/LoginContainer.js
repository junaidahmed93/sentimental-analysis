import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'material-ui/Snackbar';
import { Grid, Row, Col } from 'react-flexbox-grid';
import * as actions from '../actions/loginActions';
import Login from '../components/Login';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      openSnackBar: false,
      errorMessage: '',
      passwordReset: false,
      codeSent: false,
      codeVerified: false,
      resetToken: '',

    };
  }

  componentWillMount() {
    if (this.props && this.props.user && JSON.stringify(this.props.user) !== '{}') {
      browserHistory.push('/home/admin/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {

  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.openSnackBar === true) {
      this.setState({ openSnackBar: false });
    }
  }

  enableForgetDialog() {
    this.setState({ passwordReset: true });
  }


  handleLogin(user) {
    this.setState({ progressBar: true });
    this.props.actions.logInUser({
      email: user.email,
      password: user.password,
    });
  }
  render() {
    console.log('props', this.props);
    return (
      <div>
        <Grid fluid className="loginGrid">
          <Row className="loginGridRow">
            <Col xs={12} sm={6} md={5} lg={4} className="loginGridColLeft">
              <Login login={this.handleLogin} enableForgetDialog={this.enableForgetDialog} />
            </Col>
            <Col xs={0} sm={6} md={7} lg={8}>
              <div className="MainLogo" />
            </Col>
          </Row>
        </Grid>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));
