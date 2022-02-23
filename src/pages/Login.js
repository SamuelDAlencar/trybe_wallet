import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { logIn } from '../actions/index';
import './css/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
    this.handleInput = this.handleInput.bind(this);
    this.logButton = this.logButton.bind(this);
  }

  handleInput({ target: { id, value } }) {
    this.setState({
      [id]: value,
    }, () => {
      const { email, password } = this.state;
      const MIN_LENGTH = 6;

      if (password.length >= MIN_LENGTH
        && email.includes('@')
        && email.includes('.com')) {
        this.setState({ buttonDisabled: false });
      } else {
        this.setState({ buttonDisabled: true });
      }
    });
  }

  logButton() {
    const { logInProp, history } = this.props;
    const { email } = this.state;

    logInProp(email);
    history.push('/carteira');
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <main className="login-main">
        <form autoComplete="off" className="login-main__form">
          <div className="login-main__div">
            <h1>Virtual Wallet</h1>
            <h3>Practical, fast, easy to use, free</h3>
          </div>
          <label htmlFor="email" className="login-form__label">
            Email
            <input
              type="email"
              id="email"
              data-testid="email-input"
              onChange={ (e) => this.handleInput(e) }
              className="login-form__label__input"
            />
          </label>
          <label htmlFor="password" className="login-form__label">
            Password
            <input
              type="password"
              id="password"
              data-testid="password-input"
              onChange={ (e) => this.handleInput(e) }
              className="login-form__label__input"
            />
          </label>
          <button
            type="button"
            disabled={ buttonDisabled }
            onClick={ this.logButton }
            className="login-form__button"
          >
            Log in
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  logInProp: Proptypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  logInProp: (state) => dispatch(logIn(state)),
});

export default connect(null, mapDispatchToProps)(Login);
