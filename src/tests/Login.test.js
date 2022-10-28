import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Aplica casos de testes em Login.js', () => {
  const email = 'test@test.com';

  it('Testa se o componente Login é renderizado quando a url for: /', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const titleLogin = screen.getByRole('heading', { level: 3, name: /login/i });

    expect(history.location.pathname).toBe('/');
    expect(titleLogin).toBeInTheDocument();
  });

  it('Testa se é possível digitar nos campos de input de Login', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(/email-input/i);
    const inputPassword = screen.getByTestId(/password-input/i);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, '123456');

    expect(inputEmail).toHaveValue(email);
    expect(inputPassword).toHaveValue('123456');
  });

  it('Testa se existe validação, para o formato do email, no input para efetuar login na aplicação.', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(/email-input/i);
    const inputPassword = screen.getByTestId(/password-input/i);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });

    // validação email 1
    userEvent.type(inputEmail, 'test.com');
    userEvent.type(inputPassword, '123456');

    expect(buttonLogin.disabled).toBe(true);

    // validação email 2
    userEvent.type(inputEmail, 'test@test');
    userEvent.type(inputPassword, '123456');

    expect(buttonLogin.disabled).toBe(true);

    // validação email 3
    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, '123456');

    expect(buttonLogin.disabled).toBe(false);
  });

  it('Testa se existe validação, para o formato do password, no input para efetuar login na aplicação.', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(/email-input/i);
    const inputPassword = screen.getByTestId(/password-input/i);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });

    // validação password 1
    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, '');

    expect(buttonLogin.disabled).toBe(true);

    // validação password 2
    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, '12345');

    expect(buttonLogin.disabled).toBe(true);

    // validação password 3
    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, '123456');

    expect(buttonLogin.disabled).toBe(false);
  });

  it('Testa se, quando o botão entrar é clicado, a pessoa usuária é redirecionada para o componente Wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(/email-input/i);
    const inputPassword = screen.getByTestId(/password-input/i);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, '123456');
    userEvent.click(buttonLogin);

    expect(history.location.pathname).toBe('/carteira');
  });
});
