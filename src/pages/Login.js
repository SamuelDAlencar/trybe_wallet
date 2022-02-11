import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { logIn } from '../actions/index';

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
      <form>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            data-testid="email-input"
            onChange={ (e) => this.handleInput(e) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            data-testid="password-input"
            onChange={ (e) => this.handleInput(e) }
          />
        </label>
        <button
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.logButton }
        >
          Entrar
        </button>
      </form>
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
