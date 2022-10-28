import fetchCurrencies from '../../services/fetchCurrencies';

export const REQUEST = 'REQUEST';
export const REQUEST_SUCESS = 'REQUEST_SUCESS';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';

const fetchRequest = () => ({
  type: REQUEST,
});

const fetchRequestSucess = (currencies) => ({
  type: REQUEST_SUCESS,
  currencies,
});

const fetchRequestFailure = (error) => ({
  type: REQUEST_FAILURE,
  error,
});

export const getAllCurrencys = () => (
  async (dispatch) => {
    dispatch(fetchRequest());

    try {
      const RESPONSE = await fetchCurrencies();
      dispatch(fetchRequestSucess(RESPONSE));
    } catch (erro) {
      console.log(erro.message);
      dispatch(fetchRequestFailure(erro.message));
    }
  }
);
