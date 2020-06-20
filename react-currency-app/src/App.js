import React from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import ExchangeRates from './components/ExchangeRates/ExchangeRates';
import CurrencyRates from './components/CurrencyRates/CurrencyRates';
import HistoricalRates from './components/HistoricalRates/HistoricalRates';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <div className="title">Currency Exhange App</div>
        <NavLink to="/currency" activeClassName="selected">Currency Rates</NavLink>
        <NavLink to="/exchange" activeClassName="selected">Exchange Rates</NavLink>
        <NavLink to="/historical" activeClassName="selected">Historical Rates</NavLink>
      </nav>
      <div className="main-container">
        <Switch>
          <Route exact path="/">
              <Redirect to="/currency" />
          </Route>
          <Route path="/currency" component={CurrencyRates} />
          <Route path="/exchange" component={ExchangeRates} />
          <Route path="/historical" component={HistoricalRates} />
        </Switch>
      </div>
    </div>

  );
}

export default App;
