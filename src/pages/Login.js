import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveUserInfos } from '../redux/actions/saveUserInfos';
import '../css/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  validateInputs = () => {
    const { email, password } = this.state;

    const emailRegex = /\S+@\S+\.\S+/;
    const minLength = 6;

    const isValideEmail = emailRegex.test(email);
    const isValidePass = password.length >= minLength;

    if (isValideEmail && isValidePass) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, this.validateInputs);
  };

  handleClick = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(saveUserInfos(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;

    return (
      <section className="login-screen">
        <div className="blur" />
        <section className="left-side">
          <h1 className="logo1">
            Trybe
            <span>wallet</span>
          </h1>
          <h4>Eleito o 1° entre os gerenciadores de finanças pela Trybe Awards 2022</h4>

          <h5>Com o Trybewallet você tem:</h5>
          <ul className="benefits-list">
            <li>
              <span className="more">+</span>
              {' '}
              controle de suas movimentações finançeiras
              {' '}
            </li>
            <li>
              <span className="more">+</span>
              {' '}
              dinheiro no fim do mês
            </li>
            <li>
              <span className="more">+</span>
              {' '}
              viagens planejadas
            </li>
            <li>
              <span className="less">-</span>
              {' '}
              preocupações
            </li>
            <li>
              <span className="less">-</span>
              {' '}
              dívidas
            </li>
          </ul>
        </section>
        <section className="rigth-side">
          <form className="login-form card">
            <h3 className="login-title">Login</h3>
            <input
              required
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              placeholder="Email"
              data-testid="email-input"
            />
            <input
              required
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              placeholder="Senha"
              data-testid="password-input"
            />
            <button
              type="submit"
              disabled={ isButtonDisabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </form>
        </section>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
