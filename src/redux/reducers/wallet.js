// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST, REQUEST_SUCESS, REQUEST_FAILURE } from '../actions/currencyActions';
import { DELETE_EXPENSE } from '../actions/deleteExpense';
import { EDIT_EXPENSE, SAVE_EDIT } from '../actions/editExpense';
import { REQUESTE_SUCESS_AND_SAVE_EXPENSE } from '../actions/saveExpense';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const createId = (expenses) => expenses.reduce((acc, curr, i) => {
  curr.id = i;
  acc.push(curr);
  return acc;
}, []);

const addQuote = (expense, currencies) => {
  const currenciesInfoReduce = Object.entries(currencies) // [[[chave],[value]], [[chave],[value]]]
    .reduce((acc, curr) => {
      const [currencyName, currencyInfos] = curr;
      acc[currencyName] = currencyInfos;
      return acc;
    }, {});
  expense.exchangeRates = currenciesInfoReduce;
  return expense;
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST: return { ...state, loading: true };
  case REQUEST_SUCESS: {
    const currenciesFilter = Object.keys(action.currencies)
      .filter((currency) => currency !== 'USDT');
    return { ...state, loading: false, currencies: currenciesFilter,
    };
  }
  case REQUEST_FAILURE: return { ...state, loading: false };
  case REQUESTE_SUCESS_AND_SAVE_EXPENSE: {
    const newArrExpenses = [...state.expenses,
      addQuote(action.expense, action.currencies)];
    return { ...state, loading: false, expenses: createId(newArrExpenses),
    };
  }
  case DELETE_EXPENSE: {
    const { expenses } = state;
    const filteredExpenses = expenses.filter((expense) => expense.id !== action.id);
    return { ...state, expenses: filteredExpenses };
  }
  case EDIT_EXPENSE: {
    const { expenses } = state;
    const selectedExpense = expenses.find((expense) => expense.id === action.id);
    return { ...state,
      editor: true,
      selectedExpense,
    };
  }
  case SAVE_EDIT: {
    const { expenses } = state;
    const newArrEpenses = expenses.reduce((acc, curr) => {
      if (curr.id === action.id) {
        curr = action.expense;
        acc.push(curr);
        return acc;
      }
      acc.push(curr);
      return acc;
    }, []);
    return { ...state, expenses: newArrEpenses, editor: false };
  }
  default: return state;
  }
};

export default walletReducer;
