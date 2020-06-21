import React from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import ExchangeRates from '../ExchangeRates/ExchangeRates';
import CurrencyRates from '../CurrencyRates/CurrencyRates';
import HistoricalRates from '../HistoricalRates/HistoricalRates';
import './MainLayout.css';

function App() {
  return (
    <div className="MainLayout">
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
