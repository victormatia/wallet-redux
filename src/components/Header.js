import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/Header.css';

class Header extends Component {
  updateAmountByQuote = (expenses) => (
    expenses.reduce((acc, curr) => {
      const { value } = curr;
      const { ask } = curr.exchangeRates[curr.currency];
      const quote = value * ask;

      return acc + quote;
    }, 0)
  );

  render() {
    const { email, expenses } = this.props;
    const totalAmount = expenses.length ? this.updateAmountByQuote(expenses) : 0.00;

    return (
      <header>
        <h2 className="logo2">
          Trybe
          <span>Wallet</span>
        </h2>
        <section className="user-infos">
          <p data-testid="email-field">{`Email: ${email}`}</p>
          <section className="amount">
            <p>R$:</p>
            <p data-testid="total-field">{ totalAmount.toFixed(2) }</p>
          </section>
          <p data-testid="header-currency-field">BRL</p>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
