import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions/deleteExpense';
import { editExpense } from '../redux/actions/editExpense';
import '../css/Table.css';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;

    return (
      <table border="1">
        <thead>
          {/* O react pede para que haja uma tag thead encapsulando as th's */}
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        {
          <tbody>
            {/* O react pede para que haja uma tag tbody encapsulando as tr's */}
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ Number(expense.value).toFixed(2) }</td>
                  <td>{ expense.exchangeRates[expense.currency].name }</td>
                  <td>
                    { Number(expense
                      .exchangeRates[expense.currency].ask).toFixed(2) }

                  </td>
                  <td>
                    {
                      (Number(expense.value)
                    * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      className="edit-button"
                      data-testid="edit-btn"
                      type="button"
                      onClick={ () => dispatch(editExpense(expense.id)) }
                    >
                      Editar despesa

                    </button>
                    <button
                      className="delete-button"
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => dispatch(deleteExpense(expense.id)) }
                    >
                      Excluir

                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        }
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.any,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
