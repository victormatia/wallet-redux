import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import MOCK_INITIAL_STATE_EDITOR_TRUE from './helpers/mockInitialStateEditorTrue';
import MOCK_INITIAL_STATE_EDITOR_FALSE from './helpers/mockInitialStateEditorFalse';

describe('Aplica casos de testes em Walet.js', () => {
  it('Testa se o componente Wallet é renderizado corretamente na tela', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const titleWallet = screen.getByRole('heading', { level: 2, name: /trybewallet/i });
    const totalAmountExpenses = screen.getByTestId(/total-field/i);
    const inputValue = screen.getByPlaceholderText(/valor da despesa/i);
    const table = await screen.findByRole('table');

    expect(history.location.pathname).toBe('/carteira');
    expect(titleWallet).toBeInTheDocument();
    expect(totalAmountExpenses.innerHTML).toBe('0.00');
    expect(inputValue).toBeInTheDocument();
    expect(table).toBeInTheDocument();
  });

  it('Testa se é possível adicionar uma despesa', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputValue = screen.getByTestId(/value-input/i);
    const inputDescription = screen.getByTestId(/description-input/i);
    const inputCurrency = screen.getByTestId(/currency-input/i);
    const inputMethod = screen.getByTestId(/method-input/i);
    const inputTag = screen.getByTestId(/tag-input/i);
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inputValue, '10');
    userEvent.type(inputDescription, 'sorvete');
    await waitFor(() => {
      userEvent.selectOptions(inputCurrency, ['BTC']);
    });
    userEvent.selectOptions(inputMethod, ['Cartão de crédito']);
    userEvent.selectOptions(inputTag, ['Alimentação']);
    userEvent.click(addButton);

    const descriptionCell = await screen.findByRole('cell', { name: /sorvete/i });
    const valueCell = await screen.findByRole('cell', { name: '10.00' });
    const currencyCell = await screen.findByRole('cell', { name: /bitcoin/i });
    const methodCell = await screen.findByRole('cell', { name: /cartão de crédito/i });
    const tagCell = await screen.findByRole('cell', { name: /alimentação/i });

    expect(history.location.pathname).toBe('/carteira');
    expect(descriptionCell).toBeInTheDocument();
    expect(valueCell).toBeInTheDocument();
    expect(currencyCell).toBeInTheDocument();
    expect(methodCell).toBeInTheDocument();
    expect(tagCell).toBeInTheDocument();
  });

  it('Testa se, quando adicionadas, as desespesas aparecem na tela', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: MOCK_INITIAL_STATE_EDITOR_FALSE,
    });

    const totalAmountExpenses = await screen.findByTestId(/total-field/i);
    const descriptionCell = await screen.findByRole('cell', { name: /sorvete/i });
    const valueCell = await screen.findByRole('cell', { name: '10.00' });
    const currencyCell = await screen.findByRole('cell', { name: /dólar americano/i });
    const methodCell = await screen.findByRole('cell', { name: /cartão de crédito/i });
    const tagCell = await screen.findByRole('cell', { name: /alimentação/i });
    const buttomEdit = await screen.findAllByRole('button', { name: /editar despesa/i });

    expect(history.location.pathname).toBe('/carteira');
    screen.debug();
    expect(totalAmountExpenses.innerHTML).toBe('52.38');
    expect(descriptionCell).toBeInTheDocument();
    expect(valueCell).toBeInTheDocument();
    expect(currencyCell).toBeInTheDocument();
    expect(methodCell).toBeInTheDocument();
    expect(tagCell).toBeInTheDocument();
    expect(buttomEdit.length).toBe(1);
  });

  it('Testa se o formulário de editar desdesas aparece na tela quando a chave editor, do estado global, é true', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: MOCK_INITIAL_STATE_EDITOR_TRUE });

    const editarButton = screen.getByTestId(/edit-expense-button/i);

    expect(history.location.pathname).toBe('/carteira');
    expect(editarButton).toBeInTheDocument();
  });

  it('Testa se é possível editar uma despesa', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: MOCK_INITIAL_STATE_EDITOR_FALSE,
    });

    const totalAmountExpenses = await screen.findByTestId(/total-field/i);
    const descriptionCell = await screen.findByRole('cell', { name: /sorvete/i });
    const valueCell = await screen.findByRole('cell', { name: /10/i });
    const currencyCell = await screen.findByRole('cell', { name: /dólar americano/i });
    const methodCell = await screen.findByRole('cell', { name: /cartão de crédito/i });
    const tagCell = await screen.findByRole('cell', { name: /alimentação/i });

    expect(history.location.pathname).toBe('/carteira');
    expect(totalAmountExpenses.innerHTML).toBe('52.38');
    expect(descriptionCell).toBeInTheDocument();
    expect(valueCell).toBeInTheDocument();
    expect(currencyCell).toBeInTheDocument();
    expect(methodCell).toBeInTheDocument();
    expect(tagCell).toBeInTheDocument();

    const editButton = await screen.findByTestId(/edit-btn/i);
    userEvent.click(editButton);

    const inputValue = screen.getByTestId(/value-input/i);
    const inputDescription = screen.getByTestId(/description-input/i);
    const inputCurrency = screen.getByTestId(/currency-input/i);
    const inputMethod = screen.getByTestId(/method-input/i);
    const inputTag = screen.getByTestId(/tag-input/i);
    const saveButton = await screen.findByTestId(/edit-expense-button/i);

    userEvent.clear(inputValue);
    userEvent.type(inputValue, '12.30');

    userEvent.clear(inputDescription);
    userEvent.type(inputDescription, 'Passagem de trem');

    userEvent.selectOptions(inputCurrency, ['BTC']);
    userEvent.selectOptions(inputMethod, ['Cartão de débito']);
    userEvent.selectOptions(inputTag, ['Transporte']);
    userEvent.click(saveButton);

    const editedDescriptionCell = await screen.findByRole('cell', { name: /passagem de trem/i });
    const editedValueCell = await screen.findByRole('cell', { name: '12.30' });
    const editedCurrencyCell = await screen.findByRole('cell', { name: /bitcoin/i });
    const editedMethodCell = await screen.findByRole('cell', { name: /cartão de débito/i });
    const editedTagCell = await screen.findByRole('cell', { name: /transporte/i });

    expect(editedDescriptionCell).toBeInTheDocument();
    expect(editedValueCell).toBeInTheDocument();
    expect(editedCurrencyCell).toBeInTheDocument();
    expect(editedMethodCell).toBeInTheDocument();
    expect(editedTagCell).toBeInTheDocument();
  });

  it('Testa se é posssível excluir uma despesa', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: MOCK_INITIAL_STATE_EDITOR_FALSE,
    });
    const totalAmountExpenses = await screen.findByTestId(/total-field/i);
    const descriptionCell = await screen.findByRole('cell', { name: /sorvete/i });
    const valueCell = await screen.findByRole('cell', { name: /10/i });
    const currencyCell = await screen.findByRole('cell', { name: /dólar americano/i });
    const methodCell = await screen.findByRole('cell', { name: /cartão de crédito/i });
    const tagCell = await screen.findByRole('cell', { name: /alimentação/i });

    expect(history.location.pathname).toBe('/carteira');
    expect(totalAmountExpenses.innerHTML).toBe('52.38');
    expect(descriptionCell).toBeInTheDocument();
    expect(valueCell).toBeInTheDocument();
    expect(currencyCell).toBeInTheDocument();
    expect(methodCell).toBeInTheDocument();
    expect(tagCell).toBeInTheDocument();

    const deleteButton = screen.getByTestId(/delete-btn/i);

    userEvent.click(deleteButton);

    expect(totalAmountExpenses.innerHTML).toBe('0.00');
    expect(descriptionCell).not.toBeInTheDocument();
    expect(valueCell).not.toBeInTheDocument();
    expect(currencyCell).not.toBeInTheDocument();
    expect(methodCell).not.toBeInTheDocument();
    expect(tagCell).not.toBeInTheDocument();
  });
});
