import fetchCurrencies from '../../services/fetchCurrencies';
import { REQUEST, REQUEST_FAILURE } from './currencyActions';

export const REQUESTE_SUCESS_AND_SAVE_EXPENSE = 'REQUESTE_SUCESS_AND_SAVE_EXPENSE';

const fetchRequest = () => ({
  type: REQUEST,
});

const fetchRequestSucess = (currencies, expense) => ({
  type: REQUESTE_SUCESS_AND_SAVE_EXPENSE,
  currencies,
  expense,
});

const fetchRequestFailure = (error) => ({
  type: REQUEST_FAILURE,
  error,
});

export const saveExpense = (expense) => (
  async (dispatch) => {
    dispatch(fetchRequest());

    try {
      const RESPONSE = await fetchCurrencies();
      dispatch(fetchRequestSucess(RESPONSE, expense));
    } catch (erro) {
      console.log(erro.message);
      fetchRequestFailure(erro.message);
    }
  }
);
