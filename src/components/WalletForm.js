import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveExpense } from '../redux/actions/saveExpense';
import Option from './Option';
import '../css/WalletForm.css';

const paraCorrigirErroDoLint = 'Alimentação';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: paraCorrigirErroDoLint,
      description: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(saveExpense(this.state));
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: paraCorrigirErroDoLint,
      description: '',
    });
  };

  render() {
    const { value, description, currency,
      method, tag } = this.state;
    const { currencies } = this.props;
    const paymentMethods = ['Dinheiro', 'Cartão de débito', 'Cartão de crédito'];
    const tags = [paraCorrigirErroDoLint, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form className="form" onSubmit={ this.handleSubmit }>
        <input
          data-testid="value-input"
          type="number"
          placeholder="Valor da despesa"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <textarea
          data-testid="description-input"
          placeholder="Descrição"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {
            currencies.map((curr) => ( // curr === currency
              <Option
                key={ curr }
                name={ curr }
                value={ curr }
              />
            ))
          }
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          {
            paymentMethods.map((paymentMethod) => (
              <Option
                key={ paymentMethod }
                name={ paymentMethod }
                value={ paymentMethod }
              />
            ))
          }
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          {
            tags.map((e) => (
              <Option key={ e } name={ e } value={ e } />
            ))
          }
        </select>
        <button
          type="submit"
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
    name: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
