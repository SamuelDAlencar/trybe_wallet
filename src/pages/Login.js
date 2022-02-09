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
      isDisabled: true,
    };
    this.handleInput = this.handleInput.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
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
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  submitInfo() {
    const { dispatchInfo, history } = this.props;
    const { email } = this.state;

    dispatchInfo(email);
    history.push('/carteira');
  }

  render() {
    const { isDisabled } = this.state;
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
        <button type="button" disabled={ isDisabled } onClick={ this.submitInfo }>
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatchInfo: Proptypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchInfo: (state) => dispatch(logIn(state)),
});

export default connect(null, mapDispatchToProps)(Login);
