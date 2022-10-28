import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './css/App.css';

const rota = 'https://victormatia.github.io/wallet-redux#/';

export default class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path={rota} component={ Login } />
          <Route exact path="/carteira" component={ Wallet } />
        </Switch>
      </main>
    );
  }
}
