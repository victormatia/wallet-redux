export default async function fetchCurrencies() {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const REQUEST = await fetch(URL);
  const RESPONSE = REQUEST.json();

  return RESPONSE;
}
